export const formatXml = (xmlString) => {
  if (!xmlString || typeof xmlString !== "string") return "";

  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(
      xmlString.trim(),
      "application/xml"
    );

    // Si el XML es inválido, devuelve el string original
    if (xmlDoc.getElementsByTagName("parsererror").length) {
      return xmlString;
    }

    const serializer = new XMLSerializer();
    const xml = serializer.serializeToString(xmlDoc);

    let formatted = "";
    let indent = 0;
    const spaces = 2;

    xml
      .replace(/(>)(<)(\/*)/g, "$1\n$2$3")
      .split("\n")
      .forEach((line) => {
        if (line.match(/^<\/.+>/)) indent--;

        formatted +=
          " ".repeat(indent * spaces) + line.trim() + "\n";

        if (
          line.match(/^<[^!?\/].*[^\/]>$/) &&
          !line.startsWith("</")
        ) {
          indent++;
        }
      });

    return formatted.trim();
  } catch {
    return xmlString;
  }
};
