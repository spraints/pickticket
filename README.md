# Three ways

## Ruby

Save gmail raw email to disk and run `ruby rearrange-pick-ticket.rb FILE > f.html && open f.html` and then print the result.

## Bookmarklet

`node_modules/.bin/uglifyjs rearrange-pick-ticket.js | sed -e 's/^/javascript:(/' -e 's/;*$/)();/' | pbcopy` and then bookmark it. In gmail, click the print icon, cancel, use the bookmarklet, then Cmd-P to actually print it.

## Web page

Visit http://pickardayune.com/pickticket/, paste in the gmail source, click "Render", and print the page.
