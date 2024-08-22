export const JWT_CONFIG=()=>{
    return {
        JWT_SECRET:process.env['JWT_SECRET'],
        JWT_EXPIRATION:process.env['JWT_EXPIRATION']
    }
}