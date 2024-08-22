import { registerAs } from "@nestjs/config";

export const DATABASE_CONFIG=registerAs('DATABASE_CONFIG',()=>{
     return {
        DATABASE:process.env['DATABASE'],
        DATABASE_PORT:process.env['DATABASE_PORT'],
        DATABASE_HOST:process.env['DATABASE_HOST'],
        DATABASE_NAME:process.env['DATABASE_NAME'],

        getDatabaseUrl(){
            return `${this.DATABASE}://${this. DATABASE_PORT}:${this. DATABASE_PORT}/${this.DATABASE_NAME}`
        }
     }
})