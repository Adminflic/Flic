// Método para exportar a CSV
export const exportToCSV = (dataToExport) => {
  if (dataToExport.length === 0) {
      alert('No hay datos para exportar')
      return
  }

  // Obtener las columnas (keys del primer objeto)
  const headers = Object.keys(dataToExport[0])
  
  // Crear contenido CSV
  let csvContent = headers.join(',') + '\n'
  
  // Agregar filas
  dataToExport.forEach(item => {
      const row = headers.map(header => {
          let value = item[header]
          
          // Manejar valores nulos, undefined y strings con comas
          if (value === null || value === undefined) {
              value = ''
          } else if (typeof value === 'string' && value.includes(',')) {
              value = `"${value}"` // Escapar comas en strings
          } else if (typeof value === 'string') {
              value = value.replace(/"/g, '""') // Escapar comillas dobles
          }
          
          return value
      }).join(',')
      
      csvContent += row + '\n'
  })

  // Crear y descargar archivo
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `reporte_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Método para exportar a Excel (XLSX)
export const exportToExcel = (dataToExport) => {
  if (dataToExport.length === 0) {
      alert('No hay datos para exportar')
      return
  }

  // Obtener las columnas
  const headers = Object.keys(dataToExport[0])
  
  // Crear contenido HTML para Excel
  let htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
          <meta charset="UTF-8">
          <!--[if gte mso 9]>
          <xml>
              <x:ExcelWorkbook>
                  <x:ExcelWorksheets>
                      <x:ExcelWorksheet>
                          <x:Name>Reporte</x:Name>
                          <x:WorksheetOptions>
                              <x:DisplayGridlines/>
                          </x:WorksheetOptions>
                      </x:ExcelWorksheet>
                  </x:ExcelWorksheets>
              </x:ExcelWorkbook>
          </xml>
          <![endif]-->
      </head>
      <body>
          <table border="1">
              <thead>
                  <tr style="background-color: #f8f9fa; font-weight: bold;">
  `
  
  // Agregar headers
  headers.forEach(header => {
      htmlContent += `<th>${header}</th>`
  })
  
  htmlContent += `
                  </tr>
              </thead>
              <tbody>
  `
  
  // Agregar filas
  dataToExport.forEach(item => {
      htmlContent += '<tr>'
      headers.forEach(header => {
          let value = item[header]
          if (value === null || value === undefined) {
              value = ''
          }
          // Escapar HTML y formatear
          value = String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;')
          htmlContent += `<td>${value}</td>`
      })
      htmlContent += '</tr>'
  })
  
  htmlContent += `
              </tbody>
          </table>
      </body>
      </html>
  `

  // Crear y descargar archivo
  const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `reporte_${new Date().toISOString().split('T')[0]}.xls`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}