#!/usr/bin/env ruby

require "mail"
require "nokogiri"

def main(raw_mail_path)
  mail = Mail.read(raw_mail_path)
  html = Nokogiri::HTML(mail.body.decoded)
  orders = find_orders(html)
  write html.css("head"), orders
end

def find_orders(html)
  customer_els = html.css("strong").select { |el| el.text == "Customer:" }
  order_els = customer_els.map { |el| el.ancestors("div").first }
  order_els.map { |el| Order.new(el) }.sort_by(&:sort_val)
end

def write(html_head, orders)
  puts "<!DOCTYPE html>", "<html>"
  puts html_head
  puts "<body>"
  orders.each do |order|
    puts order
  end
  puts "</body>", "</html>"
end

class Order
  def initialize(order)
    @order = order
  end

  def to_s
    @order.to_s
  end

  def sort_val
    @sort_val ||= [product, customer_number]
  end

  def product
    @order.css("strong").find { |el| el.text == "Product:" }.next.text.strip
  end

  def customer_number
    @order.css("span").text.gsub(/[^0-9]+/,"")
  end
end

main(*ARGV)
