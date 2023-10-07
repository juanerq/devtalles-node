import fs from 'fs'

export const getHeaderMessage = (base: number): string => {
  return `
=============================
      TABLE OF ${base}
=============================
  `
}

export const createTableMultiplicate = (base: number, limit: number): string => {
  let outputMessage = ''
  
  for(let i = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`
  }
  return outputMessage
}

export const createFile = (path: string, fileName: string, content: string) => {
  if(!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
    console.log('Directory created!');
  }
  fs.writeFileSync(path + fileName, content)
  console.log('File created!');
  
}
