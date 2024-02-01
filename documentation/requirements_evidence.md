Config management (3 points):

.env (technically whole file)

config.mjs (technically whole file)

db.mjs: line 4

app.mjs: line 281, 288

___

Frontend framework (vue js) (6 points):

Essentially the whole 'frontend' directory. 

The 'public' directory which stores the build result.

___

API (1 point):

app.mjs: line 45, line 55

(only used for initial db setup) setupdb.mjs: line 23, line 34

___

other required stuff

minimum 3 x forms or ajax interactions other than login/register:

app.mjs: line 45, line 55

frontend/src/views: all the view files use axios

forms: frontend/src/views/CreateTeam.vue and frontend/src/views/Transfer.vue

___

built-in higher order functions:

frontend/src/views/CreateTeam.vue: line 178, line 187, line 196, line 205

frontend/src/views/Transfer.vue: line 193, line 209

app.mjs: line 48, line 57

setupdb.mjs: line 26, line 36, line 44

___

minimum 2 x mongoose schemas:

db.mjs

___
simple validation on user input to prevent application from crashing:

frontend/src/views/Register.vue line 41

mongo-sanitize in app.mjs in lines 104,105,128,129

___
doesn't allow user input to be displayed unescaped directly on page:

frontend/src/views/Register.vue line 10, 13

frontend/src/views/Login.vue line 12

___
pages that require authentication cannot be accessed without authentication:

frontend/src/views/CreateTeam.vue: line 135

frontend/src/views/Transfer.vue: line 162

frontend/src/views/MyTeam.vue: line 146

frontend/src/views/Leaderboard.vue: line 155

frontend/src/views/Standings.vue: line 156

___

data specified as private to a user cannot be viewed by another user:

done via sessions in app.mjs (line 24)
