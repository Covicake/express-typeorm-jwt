# Express REST API with TypeORM and JWT auth

Basic implementation for a express.js server using TypeScript, TypeORM and JWT auth. It involves:

## Auth
* [Pending] Signup
* Hashing of passwords before inserting to Database (With *bcrpt*)
* Login comparing hashed password
* JWT authorization for every controller, except 'AuthController' (with *jsonwebtoken*)

## TypeORM
* [Pending] Setup migrations
* Entities-to-database synchronization
* Entities definition (with autoincremented ids, auto-inserted created_at|updated_at columns) and many useful configs
* Repository pattern implementation
  * [Pending] implement singleton pattern for repository classes and inject them to the controllers (A la Spring Boot)
 
 ## Express
 * Autowired express server with
  * global middlewares
  * controllers setup
    * with their own set of local middlewares
  * typeorm connection
