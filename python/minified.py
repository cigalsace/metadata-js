#!/usr/bin/python2
from slimit import minify
from rcssmin import cssmin

def minifyCSSProc(srcText):
    return cssmin(srcText, keep_bang_comments=True)

def minifyJSProc(srcText):
    return minify(srcText, mangle=True, mangle_toplevel=True)

def doProcessFiles(minifyProc, sourcePaths, header, destPath, minPath):
    print "Combining to %s and %s" % (destPath,minPath)
    f = open(destPath, 'w')
    mf = None
    try:
        mf = open(minPath, 'w')
        mf.write(header)
        for srcFile in sourcePaths:
            print(srcFile)
            with open(srcFile) as inputFile:
                srcText = inputFile.read()
                minText = minifyProc(srcText)
            f.write(srcText)
            mf.write(minText)
    finally:
        f.close()
        if mf and not mf.closed:
            mf.close()

def doJSMin(sourcePaths, header, destPath, minPath):
    return doProcessFiles(minifyJSProc, sourcePaths, header, destPath, minPath)

def doCSSMin(sourcePaths, destPath, minPath):
    return doProcessFiles(minifyCSSProc, sourcePaths, '', destPath, minPath)

jsDestPath = "js/metadata.js"
jsMinPath = "js/metadata.min.js"
jsHeaderPath = "js/src/header.js"

jsSources = [
    "js/src/helpers.js",
    "js/src/config.js",
    "js/src/codeslists.js",
    "js/src/xpaths.js",
    "js/src/obj-empty.js",
    "js/src/obj-models.js",
    "js/src/MetadataObj.js",
    "js/src/MetadataXml.js"
]

cssDestPath = "static/css/allmy.css"
cssMinPath = "static/css/allmy.min.css"

cssSources = [
    "static/css/top.css",
    "static/css/main.css"
]


if __name__ == '__main__':
    jsHeader = ''
    with open(jsHeaderPath) as f:
        jsHeader = f.read()
    doJSMin(jsSources, jsHeader, jsDestPath, jsMinPath)
    # doCSSMin(cssSources, cssDestPath, cssMinPath)
