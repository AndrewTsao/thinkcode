# coding=utf-8
#Python 2.5 or 2.63#
import os
import sys
import codecs
import xml.dom.minidom
from xml.dom.minidom import Node
reload( sys )
sys.setdefaultencoding( 'utf-8' )



##############################################
def parseXmlFile( path ):

    xmlFilePath = path + '/build.xml'

    if( os.path.isfile( xmlFilePath ) == False):
        
        print 'no find ' + xmlFilePath + ' file!'
        
        return
   
    xmlFile = open( xmlFilePath )

    doc = xml.dom.minidom.parse( xmlFile )

    for node in doc.getElementsByTagName( 'source' ):
        
        parseNode( node, path )

    xmlFile.close()
    
##############################################
def parseNode( nodeElement,path ):

    addFile = []

    toFile = ''
    
    for node in nodeElement.getElementsByTagName( 'add' ):
        
        addFile.append( node.firstChild.nodeValue )

    toFile = nodeElement.getElementsByTagName( 'to' )[ 0 ].firstChild.nodeValue

    if ( ( toFile == '') or ( len( addFile ) == 0 ) ):

        return

    createBuildFile( addFile, toFile, path )

##############################################
def createBuildFile( add, to, path ):

    toFile = path + '/' + to

    toDir = os.path.dirname( toFile )

    if( os.path.isdir( toDir ) == False):
        
        os.makedirs(  toDir )
    
    toFileHand = open( path + '/' + to, 'wb' )

    for addFile in add:

        sourceFile = path + '/' + addFile

        if ( os.path.isfile( sourceFile ) == False) :

            break

        tmpHand = file( sourceFile,'rb' )

        lines = tmpHand.readlines()

        for line in lines :

            toFileHand.write( line )

        toFileHand.write( '\n' )

        tmpHand.close()

    toFileHand.close()   
    
##############################################
def initBuild():
    
    parseXmlFile( os.path.abspath( '.' ).replace( '\\', '/' ) )

initBuild()
