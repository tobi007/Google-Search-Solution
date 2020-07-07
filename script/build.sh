#!/bin/bash

build_react() {
    echo 'building react'

    # react generate file name with hash
    # to make sure no deprecated files in dist
    rm -rf dist/*

    # chrome extension doesn't allow inline script
    export INLINE_RUNTIME_CHUNK=false
    # prevent generating sourcemap
    export GENERATE_SOURCEMAP=false

    # react-scripts build generate by default PRODUCTION build
    env-cmd -f app.prod.env react-scripts build

    # copy from build to dist, build could still be used by 'npm run start'
    mkdir -p dist
    cp -r build/* dist
}

build_others() {
    echo 'building others'

    # enable webpack(need a webpack.config.js) if you 
    # want background.js to be minified
    
#    webpack

    
#    cp src/background/firebase*.js dist
#    cp src/background/api.js dist
    mv dist/index.html dist/index-popup.html
    cp dist/index-popup.html dist/index-newtab.html
    cp public/manifest_extension.json dist/manifest.json

}

if [ $# -eq 0 ]; then
    echo 'build react|others'
fi

case $1 in
'react')
    build_react
    ;;
'others')
    build_others
    ;;
esac
