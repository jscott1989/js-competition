# Codefeud

## About
Codefeud is a system for running Javascript coding competitions. It comes with several games built in and it is easy to add your own. Codefeud is very early in development and should not be considered production ready.

## Usage
Configure the competition in config.yaml, selecting a theme from the built in themes (listed below), and game from the build in games (listed below). To run locally, ensure the dependencies are installed (`npm install`) and run app.js (`node app.js`).

### Deploying to Heroku
TODO

### Deploying elsewhere
TODO

## Configuration
TODO

## Built in games
<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>Game name</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>guess</td>
			<td>Guess</td>
			<td>A simple game where the entrant must guess a random number. Used during early development.</td>
		</tr>
	</body>
</table>

## Built in themes
<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>Theme name</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>basic</td>
			<td>Basic</td>
			<td>A plain bootstrap-based theme used during development.</td>
		</tr>
	</body>
</table>

## Creating a game
TODO

## Creating a theme
TODO

## Events
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Arguments</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>initViewModel</td>
			<td>viewModel</td>
			<td>Use this to modify the viewModel for a new component</td>
		</tr>
		<tr>
			<td>initPlayer</td>
			<td>Player</td>
			<td>Use this to modify the Player for a new component</td>
		</tr>
		<tr>
			<td>start</td>
			<td>viewModel</td>
			<td>A game is about to start</td>
		</tr>
		<tr>
			<td>next_turn</td>
			<td>Player</td>
			<td>It’s _Player_’s turn.</td>
		</tr>
			<tr>
			<td>log</td>
			<td>message</td>
			<td>In a text_based game, use this to emit to the log</td>
		</tr>
		<tr>
			<td>_start</td>
			<td>viewModel</td>
			<td>Don’t use this unless you’re working on the base gamerunner (turn-based).</td>
		</tr>
	</body>
</table>