#!/bin/sh
# Compile src/app.jsx en assets/app.js (npm install esbuild une fois)
npx esbuild src/app.jsx --outfile=assets/app.js --jsx=transform --jsx-factory=React.createElement --jsx-fragment=React.Fragment --target=es2018 --charset=utf8
