npm install >&/dev/null
node_modules/.bin/uglifyjs rearrange-pick-ticket.js | sed -e 's/^/javascript:(/' -e 's/;*$/)();/'
