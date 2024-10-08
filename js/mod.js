let modInfo = {
	name: "The Infinitree",
	id: "mymod",
	author: "Idle Gaming",
	pointsName: "energy",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.4",
	name: "Mining",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- <br>
		- `

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade("ba", 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("ba", 12)) gain = gain.times(2)
	if (hasUpgrade("ba", 13)) gain = gain.times(3)
	if (hasUpgrade("ba", 21)) gain = gain.times(2)
	if (hasUpgrade('ba', 22)) gain = gain.times(upgradeEffect('ba', 22))
	if (hasUpgrade('ba', 32)) gain = gain.times(upgradeEffect('ba', 32))
	if (hasUpgrade("ba", 34)) gain = gain.times(3)
	if (hasUpgrade("ba", 35)) gain = gain.times(3)
	if (player.ba.pe == 1) gain = gain.times(player.ba.en)
	if (hasUpgrade('ba', 41)) gain = gain.times(upgradeEffect('ba', 41))
	if (hasUpgrade('ba', 45)) gain = gain.times(upgradeEffect('ba', 45))
	if (hasUpgrade('ba', 71)) gain = gain.times(upgradeEffect('ba', 71))
	if (hasChallenge('ba', 11)) gain = gain.times(challengeEffect('ba', 11))
	if (hasUpgrade('ba', 101)) gain = gain.times(upgradeEffect('ba', 101))
	if (hasUpgrade('ba', 111)) gain = gain.times(upgradeEffect('ba', 111))
	if (hasUpgrade('o', 13)) gain = gain.times(upgradeEffect('o', 13))
	if (hasUpgrade('o', 23)) gain = gain.times(upgradeEffect('o', 23))
	if (player.ba.water.gte(2)) gain = gain.times(player.ba.water).div(2)
	if (player.ba.dirt.gte(2)) gain = gain.times(player.ba.dirt).div(1.75)
	if (player.ev.green2.gte(1)) gain = gain.times(player.ev.green2.mul(5))
	if (player.d.rd.gte(1)) gain = gain.times(player.d.rd)
	if (player.d.sd.gte(1)) gain = gain.times(player.d.sd).mul(player.d.sd).mul(1e8)
	if (hasUpgrade('ev', 101)) gain = gain.times(player.ev.boosters).mul(100)
	if (hasUpgrade('d', 12)) gain = gain.times(2).pow(1.01)
	if (hasUpgrade('ev', 31)) gain = gain.times(upgradeEffect('ev', 31))
	if (inChallenge("ba",11)) gain = gain.div(3)
	if (inChallenge("ba",12)) gain = gain.div(2)
	if (hasUpgrade('ev', 13)) gain = gain.times(upgradeEffect('ev', 13))
	if (hasUpgrade('d', 71)) gain = gain.times(player.d.jo)
	
	


	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}