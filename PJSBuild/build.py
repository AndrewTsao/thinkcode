##
##Author:xspider.org@gmail.com
##
import os
import xml.dom.minidom
from xml.dom.minidom import Node

##############################################
def parseXmlFile( path ):

    xmlFilePath = path + '\\build.xml'

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
        
        addFile.append( node.firstChild.nodeValue.replace('/','\\') )


    toFile = nodeElement.getElementsByTagName( 'to' )[ 0 ].firstChild.nodeValue.replace('/','\\')

    if ( ( toFile == '') or ( len( addFile ) == 0 ) ):

        return


    createBuildFile( addFile, toFile, path )

##############################################
def createBuildFile( add, to, path ):

    toFile = path + '\\' + to

    toDir = os.path.dirname( toFile )

    if( os.path.isdir( toDir ) == False):
        os.makedirs(  toDir )
    
    toFileHand = open( path + '\\' + to, 'w' )

    for addFile in add:

        sourceFile = path + '\\' + addFile

        if ( os.path.isfile( sourceFile ) == False) :

            break

        tmpHand = open( sourceFile )

        toFileHand.write( tmpHand.read() + '\n' )

        tmpHand.close()

    toFileHand.close()   
    
##############################################
def initBuild():
    parseXmlFile( os.path.abspath( '.' ) )

initBuild()
