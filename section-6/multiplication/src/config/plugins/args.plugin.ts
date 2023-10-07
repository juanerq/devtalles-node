import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


export const yarg = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'multiplication table base',
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'multiplication table limit'
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'show multiplication table'
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'table',
    describe: 'name of the file'
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'destination of the file'
  })
  .check((argv) => {
    if(argv.b < 1) throw 'Error: base must be greater than 0'
    if(argv.l < 1) throw 'Error: limit must be greater than 0'

    return true
  })
  .parseSync()