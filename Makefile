# lmui - Build System
# Requires: esbuild

.PHONY: dist css js clean size

CSS_FILES = src/css/00-layers.css \
            src/css/01-reset.css \
            src/css/02-theme.css \
            src/css/03-base.css \
            src/css/animations.css \
            src/css/button.css \
            src/css/form.css \
            src/css/table.css \
            src/css/progress.css \
            src/css/grid.css \
            src/css/card.css \
            src/css/alert.css \
            src/css/badge.css \
            src/css/accordion.css \
            src/css/tabs.css \
            src/css/dialog.css \
            src/css/dropdown.css \
            src/css/toast.css \
            src/css/sidebar.css \
            src/css/utilities.css

dist: css js

css:
	@mkdir -p dist
	@cat $(CSS_FILES) > dist/longterm.css
	@esbuild dist/longterm.css --minify --outfile=dist/longterm.min.css
	@cp dist/longterm.min.css docs/static/longterm.min.css
	@echo "CSS: $$(wc -c < dist/longterm.min.css | tr -d ' ') bytes (minified)"

js:
	@mkdir -p dist
	@cat src/js/base.js src/js/dialog.js src/js/tabs.js src/js/dropdown.js src/js/toast.js > dist/longterm.js
	@esbuild dist/longterm.js --minify --outfile=dist/longterm.min.js
	@cp dist/longterm.min.js docs/static/longterm.min.js
	@echo "JS: $$(wc -c < dist/longterm.min.js | tr -d ' ') bytes (minified)"

clean:
	@rm -rf dist
	@echo "Cleaned dist/"

size: dist
	@echo ""
	@echo "Bundle:"
	@echo "CSS (source):   $$(wc -c < dist/longterm.css | tr -d ' ') bytes"
	@echo "CSS (minified): $$(wc -c < dist/longterm.min.css | tr -d ' ') bytes"
	@echo "JS (source):    $$(wc -c < dist/longterm.js | tr -d ' ') bytes"
	@echo "JS (minified):  $$(wc -c < dist/longterm.min.js | tr -d ' ') bytes"
	@echo ""
	@echo "Gzipped:"
	@gzip -c dist/longterm.min.css | wc -c | xargs -I {} echo "CSS (gzipped):  {} bytes"
	@gzip -c dist/longterm.min.js | wc -c | xargs -I {} echo "JS (gzipped):   {} bytes"
