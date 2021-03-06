# ko
### stop repeating yourself

ko is a repetition eliminator written with npm shelljs (ie bash from node)

the name comes from the game of go, where ko is a rule which disallows
repeated game states.

currently ko supports basic commands for generating angular 1.5 projects in es6.

((index for this document))

---

#### ie
the component command
```
ko component todo
```

will generate the following:

```
./client/components/todo/
.../todo.html
.../todo.scss
.../todo.component.js
.../todo.component.spec.js
.../todo.controller.js
.../todo.controller.spec.js
```
as the component command has "client/components" as defaultPath in .ko-rc.json

the component, controller & their specs already filled in with names.

((CnV examples))

---

the service command
```
ko service todo-service
```

will generate the following:

```
./service/todo-service/
.../todo-service.service.js
.../todo-service.service.spec.js
```
again, with the names filled in.

((CnV examples))

---

---

### installation


```
npm i -g ko-gen
```

the npm package 'ko' is taken by something that counts how many beers some devs were drinking in a hackathon from bash.

given the importance of such counting, I have elected not to pursue taking over the name!


((.ko-rc.json))

out project has constants, and our command has params

the constants are defined in our project's .ko-rc.json file

the params are computed from the cli args given to ko

both are available during the render phase of each file

(for more about params, constants and rendering, see [writing a command](#writing-a-command))

---

### using ko

first, install a ko pack which has commands you wish to use

currently, this can be accomplished by

```
npm i -D ko-pack-name
```

now, when you run

```
ko command-from-pack
```

ko will look in the project-root/node-modules
for ko-* packs

inside such, it looks for ko-pack.json which lists the commands available.

then it runs the command. It's really that easy.

---

### writing a command

((docs on ko.util.js, param rewriting))

a command has a file structure like

```
./command-name/
.../conf.js
.../{{renderable-filename1}}.tpl
.../{{renderable-filename2}}.tpl
...
```

when we run a command, the cli-args go through a rewriting phase (which has access to the constants and in-process params)

then the files are rendered (including their names!)

((I have to go through the code to remember how it's doing mkdir -p, and if it works for sub-dirs inside the command))

the export from conf.js defines the files to be rendered, the names of the command params to be rendered, as well as the functions called (in sequence) to rewrite the cli-args into the command params


##### rendering syntax for *.tpl files

((example of .tpl file))

just a regex replace with a few case-format util transform functions

---

### undocumented features

dirs (list of directories to make at beginning of template rendering)

postScript (script to execute after this command... used after init to make root component eg)

varDefaults is now called argRewrites

fileRewrites is an [sed by jsString.replace(regex, replaceFn),..]

- this is used to edit files after the render phase

---

### upcoming features

((ko ko))
((general bash aliasing))
(( init-$1 commands run
```
echo {...} > package.json &&
npm i ko-$1 &&
ko init-$1
```
instead of having to npm init empty, npm i ko-$1, ko init-$1
))


---

### status of tests

none yet. 

---
