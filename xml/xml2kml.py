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
        
# Función de escritura del archivo KML
def escribirKML(archivoXML):
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
        filename = "ruta" + str(index) + ".kml"
        f = open(filename, "w")
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
        
        
        f.write('\t<Document>\n')
        f.write('\t\t<Placemark>\n')
        nombre = ruta.attrib["nombre"]
        f.write("\t\t\t<name>{name}</name>\n".format(name = nombre))
        f.write("\t\t\t<LineString>\n")
        f.write("\t\t\t\t<extrude>1</extrude>\n")
        f.write("\t\t\t\t<tessellate>1</tessellate>\n")
        f.write("\t\t\t\t<coordinates>\n")

        coordsXPath = ".//{" + ns + "}coordenadas"

        for coord in ruta.findall(coordsXPath):
            atributos = coord.attrib
            latitud = atributos['latitud']
            longitud = atributos['longitud']
            altitud = atributos['altitud']

            f.write("\t\t\t\t\t" + longitud + "," + latitud + "," + altitud + "\n")
            
        f.write("\t\t\t\t</coordinates>\n")
        f.write("\t\t\t\t<altitudeMode>relativeToGround</altitudeMode>\n")
        f.write("\t\t\t</LineString>\n")
        f.write("\t\t\t<Style id='lineaRoja'>\n")
        f.write("\t\t\t\t<LineStyle>\n")
        f.write("\t\t\t\t\t<color>#ff0000ff</color>\n")
        f.write("\t\t\t\t\t<width>5</width>\n")
        f.write("\t\t\t\t</LineStyle>\n")
        f.write("\t\t\t</Style>\n")
        f.write('\t\t</Placemark>\n')
        f.write('\t</Document>\n')
        f.write('</kml>\n')
        
def main():
    miArchivoXML = input('Introduzca un archivo XML = ')
    verXML(miArchivoXML)
    escribirKML(miArchivoXML)
    
if __name__ == "__main__":
    main()