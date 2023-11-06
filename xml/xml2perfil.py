# -*- coding: utf-8 -*-

import xml.etree.ElementTree as ET

# Función para depuración
def verXML(archivoXML):
    try:
        arbol = ET.parse(archivoXML)
    except IOError:
        print('No se encuentra el archivo', archivoXML)
        exit()
    except ET.ParseError:
        print("Error procesando el archivo XML = ", archivoXML)
        exit()
    
    raiz = arbol.getroot()
    
    print("\nElemento raiz = ", raiz.tag)
    if raiz.text != None:
        print("Contenido = ", raiz.text.strip('\n'))
    else:
        print("Contenido = ", raiz.text)
    
    print("Atributos = ", raiz.attrib)
    
    for hijo in raiz.findall(".//"):
        print("\nElemento = ", hijo.tag)
        if hijo.text != None:
            print("Contenido = ", hijo.text.strip('\n'))
        else:
            print("Contenido = ", hijo.text)
        
        print("Atributos = ", hijo.attrib)
        
# Función de escritura del archivo SVG
def escribirSVG(archivoXML):
    try:
        arbol = ET.parse(archivoXML)
    except IOError:
        print('No se encuentra el archivo', archivoXML)
        exit()
    except ET.ParseError:
        print("Error procesando el archivo XML = ", archivoXML)
        exit()
        
    raiz = arbol.getroot()
    
    index = 0
    
    ns = "http://www.uniovi.es"
    rutaXPath = ".//{" + ns + "}ruta"
    
    for ruta in raiz.findall(rutaXPath):
        index += 1
        filename = "perfil" + str(index) + ".svg"
        f = open(filename, "w")
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<svg version="2.0" xmlns="http://www.w3.org/2000/svg">\n')
        
        
        f.write('\t<polyline points = "\n')
        xPos = 50

        coordsXPath = ".//{" + ns + "}coordenadas"

        for coord in ruta.findall(coordsXPath):
            atributos = coord.attrib
            altitud = atributos['altitud']
            f.write("\t\t{0},{1}\n".format(xPos, 160 - float(altitud)*8))

            xPos += 80

        altitudInicial = ruta.findall(coordsXPath + "[1]")[0].attrib['altitud']

        f.write("\t\t{0},{1}\n".format(xPos, 160 - float(altitudInicial)*8))

        f.write("\t\t{0},160\n".format(xPos))

        f.write("\t\t50,160\n")

        f.write("\t\t50,{0}\n".format(160 - float(altitudInicial)*8))
        
        f.write('\t\t" style="fill:white;stroke:red;stroke-width:4" />\n')
        
        nombre = ruta.find(".//{" + ns +"}lugar")

        f.write('\t\t<text x="50" y="170" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n')
        f.write("\t\t\t" + nombre.text + "\n")
        f.write("\t\t</text>\n")

        xPos = 130
        for hito in ruta.findall(".//{" + ns + "}hito"):
            f.write('\t\t<text x="{0}" y="170" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n'.format(xPos))
            f.write("\t\t\t" + hito.attrib['nombre'] + "\n")
            f.write("\t\t</text>\n")

            xPos += 80

        f.write('\t\t<text x="{0}" y="170" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n'.format(xPos))
        f.write("\t\t\t" + nombre.text + "\n")
        f.write("\t\t</text>\n")

        f.write('</svg>\n')
        
def main():
    miArchivoXML = input('Introduzca un archivo XML = ')
    verXML(miArchivoXML)
    escribirSVG(miArchivoXML)
    
if __name__ == "__main__":
    main()