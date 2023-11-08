import { envs } from './config/plugins/envs.plugin';
import { ServerApp } from './presentation/server'
import 'dotenv/config'

;(() => {
  main()
})()

function main() {
  ServerApp.start()
}