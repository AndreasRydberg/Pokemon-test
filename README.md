= Pokemon Battle Simulator

Author: Andreas Rydberg

== Run the application

=== Requiremnts

- OS: Linux (probably Debian, or at lease being able to execute Bash)
- Bash: to run the scripts in ./bin/
- Docker compose
- Port 3000 to be unused.

=== Commands

- `bin/up` - Setup, install, seed pokemon dataset, and run dev mode with hot-reloading
- `bin/watch-log` - Monitor logs

=== Run Battle

1. Go to http://localhost:3000/api/battle in your browser. it should return JSON like `{"winner":"Team 1"}`
2. Check battle log in the docker application logs with: `bin/watch-log`

== Things to improve, if I hade more time.

- Add some kind of Dependency Injection.
- Set up ESlint and similar tools.
- Use TDD.
- Clean up and extract sub types and sub interfaces.
- Add more types, like `PokemonType`.
- Add better logging.
- Better security
- Fix TODOs that are in the code. Things that I identified need for improvement but postponed.

