# WebImg
Pan, zoom, place and resize images and videos. Press "a" to toggle individual image sizing and positioning.

## Build
- clone the repo. The app is already packaged into the build folder. All you need to do is load up index.html in a web browser.

- npm install if you want to change/update code. Use webpack to bundle.

## Directions 
ctrl-v (paste) an img or video url and it will show up.

Click and drag to move the item. Mousewheel to zoom.

'a' toggles single/multiple img move. 

' ' (space) brings up controls. At present it displays a text box with JSON describing the items, their size and position. 'Apply JSON' button loads the items replacing any that were previously there. 'Save Changes' saves the JSON to localStorage under the key 'web-img-save-data'.