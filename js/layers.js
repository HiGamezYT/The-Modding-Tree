



addLayer("ba", {
    name: "base", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BASE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        rocks: new Decimal(0),
        sand: new Decimal(0),
        bact: new Decimal(0),
        half1: new Decimal(1),
        as: new Decimal(0),
        bd1: new Decimal(3),
        bd2: new Decimal(3.5),
        bdm: new Decimal(1),
        bdm2: new Decimal(1),
        water: new Decimal(1),
        dirt: new Decimal(1),
        air: new Decimal(1),
        en: new Decimal(0),
        ea: new Decimal(1),
        emb: new Decimal(1), // Mars rocks enhancement boost
        emb2: new Decimal(1),
        obdm: new Decimal(0),
        obdm2: new Decimal(0),
        bdm3: new Decimal(1),
        pe: new Decimal(0),
        baen: new Decimal(0),
        aso: new Decimal(1e12),
        shard: new Decimal(0),
        bactmul: new Decimal(1),
        oxbo: new Decimal(1)
      
    }},
    color: "#414241",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Pure Power", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade(this.layer, 61)) mult = mult.times(upgradeEffect(this.layer, 61))
        if (hasUpgrade(this.layer, 62)) mult = mult.times(upgradeEffect(this.layer, 62))
        if (hasUpgrade(this.layer, 84)) mult = mult.times(upgradeEffect(this.layer, 84))
        if (hasUpgrade("d", 96)) mult = mult.times(upgradeEffect("d", 96))
        if (hasUpgrade("o", 14)) mult = mult.times(upgradeEffect("o", 14))
        if (player.ba.baen == 1) mult = mult.times(player.ba.en)
        if (player.ev.green3.gte(1)) mult = mult.times(player.ev.green3.mul(2.5))
        if (player.d.points.gte(1)) mult = mult.times(player.d.points).mul(300).mul(player.d.ub)
        if (player.d.wd.gte(1)) mult = mult.times(player.d.wd)
        if (hasUpgrade("ev",102)) mult = mult.times(player.ev.boosters).mul(5)
        if (hasUpgrade("ba", 161) && player.ba.shard.gte(1)) mult = mult.times(player.ba.shard).mul(500)
        if (hasUpgrade("ba", 162) && player.ba.shard.gte(1)) mult = mult.times(player.ba.shard).mul(1e7)
        if (hasUpgrade("ba", 163) && player.ba.shard.gte(1)) mult = mult.times(player.ba.shard).mul(1e9)
        if (hasUpgrade("ba", 164) && player.ba.shard.gte(1)) mult = mult.times(player.ba.shard).mul(1e11)
        if (hasUpgrade("ba", 102)) mult = mult.times(upgradeEffect("ba", 102))
        if (hasUpgrade("ba", 113)) mult = mult.times(upgradeEffect("ba", 113))
        if (hasUpgrade("ev", 15)) mult = mult.times(upgradeEffect("ev", 15))
        if (hasUpgrade("d", 13)) mult = mult.times(4).pow(1.04)
        if (hasUpgrade("d", 63)) mult = mult.times(12).pow(1.03)
        if (hasUpgrade("d", 64)) mult = mult.times(14).pow(1.035)
        if (player.ba.oxbo.gte(2)) mult = mult.times(player.ba.oxbo).mul(25)
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for Pure Power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
   

passiveGeneration(){return hasUpgrade("ba",51)},
update() {

   
     if (hasUpgrade("ba",44))  player.ba.rocks = player.ba.rocks.add(0.01)
     if (hasUpgrade("ba",52))  player.ba.rocks = player.ba.rocks.add(player.ba.bact.mul(player.ba.emb).div(player.ba.bd1).mul(player.ba.bdm))
     if (hasUpgrade("ba",53)) player.ba.sand = player.ba.sand.add(0.01)
     if (hasUpgrade("ba",91)) player.ba.bact = player.ba.bact.add(0.1)
     if (hasUpgrade("ba",112)) player.ba.dirt = player.ba.dirt.add(0.1)
     if (hasUpgrade("ba",131)) player.ba.emb = player.ba.en
     if (hasUpgrade("ba",131)) player.ba.emb2 = player.ba.en.div(1.5)
     if (hasUpgrade("ba",114)) player.ba.water = player.ba.water.add(0.1)
     if (hasUpgrade("ba",92)) player.ba.bact = player.ba.bact.add(player.o.points.mul(player.ba.bdm3).mul(player.ba.bactmul))
     if (hasUpgrade("ba",45) && player.ba.as.gte(1)) player.ba.sand = player.ba.sand.add(player.ba.bact.mul(player.ba.emb2).div(player.ba.bd2).mul(player.ba.bdm2))
     if (player.ba.bdm2 == 0) player.ba.bdm2 = player.ba.bdm2.add(2)
     if (player.ba.bdm == 0) player.ba.bdm = player.ba.bdm.add(2)
     if (hasUpgrade("ba",141)) player.ba.air = player.ba.air.add(0.1)
     if (hasUpgrade("ba",142)) player.ba.dirt = player.ba.dirt.add(player.ba.air.mul(player.ba.air.div(1e3)))
     if (hasUpgrade("ba",143)) player.ba.water = player.ba.water.add(player.ba.air.mul(player.ba.air.div(1e4)))
     if (hasUpgrade("ba",144)) player.ba.air = player.ba.air.add(player.ba.air.div(100))
     if (hasUpgrade("ba",145)) player.ba.air = player.ba.air.add(player.ba.air.div(30))
     if (player.ba.air.gte(player.ba.aso)) player.ba.air = new Decimal(player.ba.aso)
     if (hasChallenge("ba",12)) player.ba.aso = player.ba.aso.mul(player.ba.en)
     if (player.ba.aso.gte(1e20)) player.ba.aso = player.ba.aso = new Decimal(1e20)
     if (player.ba.aso == 0) player.ba.aso = player.ba.aso = new Decimal(1e12)
},

    tabFormat: {
        "Base": {
            content: [
                ["infobox", "mars"],
                "main-display",
                "prestige-button",
                "blank",
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13]]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23]]],
                ["row",[["upgrade",61],["upgrade",62],["upgrade",63]]]
            ],
            
        },
        "Exploration": {
            unlocked() {return (hasUpgrade("ba", 23))},
            content: [
                ["infobox", "marsexplore"],
                ["display-text",
                function() {return 'You have ' + format(player.ba.rocks) + ' Mars Rocks'},
                {"color": "red" , "font-size": "20px"}],
                ["display-text",
                function() {return 'You have ' + format(player.ba.sand) + ' Mars Sand'},
                {"color": "beige" , "font-size": "20px"}],
                ["display-text",
                function() {return 'You have ' + format(player.ba.bact) + ' Bacteria Samples'},
                {"color": "green" , "font-size": "20px"}],
                ["display-text",
                    function() {return 'You have ' + format(player.ba.water) + ' Water Molecules'},
                    {"color": "cyan" , "font-size": "20px"}],
                ["display-text",
                    function() {return 'You have ' + format(player.ba.dirt) + ' Mars Dirt'},
                    {"color": "brown" , "font-size": "20px"}],
                ["display-text",
                        function() {return 'You have ' + format(player.ba.air) + ' Air'},
                        {"color": "white" , "font-size": "20px"}],
                ["display-text",
                    function() {return 'You have ' + format(player.ba.shard) + ' Mars Shards'},
                        { "color": "gray" , "font-size": "20px"}],
                "blank",
                "respec-button",
                ["row",[["buyable",11],["buyable",12],["buyable",13]]],
                ["row",[["buyable",21],["buyable",22],["buyable",23]]],
                ["row",[["buyable",31],["buyable",32],["buyable",33]]],
            ],
            
        },
        "Mars Materials": {
            unlocked() {return (hasUpgrade("ba", 23))},
            content: [
                ["infobox", "marsma"],
                ["display-text",
                function() {return 'You have ' + format(player.ba.rocks) + ' Mars Rocks'},
                {"color": "red" , "font-size": "20px"}],
                ["display-text",
                function() {return 'You have ' + format(player.ba.sand) + ' Mars Sand'},
                {"color": "beige" , "font-size": "20px"}],
                ["display-text",
                function() {return 'You have ' + format(player.ba.bact) + ' Bacteria Samples'},
                {"color": "green" , "font-size": "20px"}],
                ["display-text",
                    function() {return 'You have ' + format(player.ba.water) + ' Water Molecules'},
                    {"color": "cyan" , "font-size": "20px"}],
                    ["display-text",
                        function() {return 'You have ' + format(player.ba.dirt) + ' Mars Dirt'},
                        {"color": "brown" , "font-size": "20px"}],
               ["display-text",
                   function() {return 'You have ' + format(player.ba.air) + ' Air'},
                    {"color": "white" , "font-size": "20px"}],
                 ["display-text",
                    function() {return 'You have ' + format(player.ba.shard) + ' Mars Shards'},
                        { "color": "gray" , "font-size": "20px"}],
                "blank",
                ["row",[["clickable",11]]],
                "blank",
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]]],
                ["row",[["upgrade",71],["upgrade",72],["upgrade",73],["upgrade",74],["upgrade",75]]],
                ["row",[["upgrade",41],["upgrade",42],["upgrade",43],["upgrade",44],["upgrade",45]]],
                ["row",[["upgrade",81],["upgrade",82],["upgrade",83],["upgrade",84],["upgrade",85]]],
                ["row",[["upgrade",51],["upgrade",52],["upgrade",53],["upgrade",54],["upgrade",55]]],
                ["row",[["upgrade",91],["upgrade",92],["upgrade",93],["upgrade",94],["upgrade",95]]],
                ["row",[["upgrade",101],["upgrade",102],["upgrade",103],["upgrade",104],["upgrade",105]]],
                ["row",[["upgrade",111],["upgrade",112],["upgrade",113],["upgrade",114],["upgrade",115]]],
                ["row",[["upgrade",141],["upgrade",142],["upgrade",143],["upgrade",144],["upgrade",145]]],
                ["row",[["upgrade",161],["upgrade",162],["upgrade",163],["upgrade",164],["upgrade",165]]]
            ],
            
        },
        "Enhancements": {
            unlocked() {return (hasUpgrade("ba", 115))},
            content: [
                ["infobox", "enhance"],
                ["display-text",
                    function() {return 'You have ' + format(player.ba.en) + ' Enhancement Crystals'},
                     {"color": "purple" , "font-size": "20px"}],
                ["row",[["buyable",51]]],
                "blank",
                ["row",[["clickable",21]]],
                "blank",
                ["row",[["clickable",31],["clickable",32],["clickable",33]]],
                ["row",[["clickable",41],["clickable",42],["clickable",43]]],
                ["row",[["clickable",51],["clickable",52],["clickable",53]]],
                "blank",
                "blank",
                ["row",[["upgrade",131],["upgrade",132],["upgrade",133],["upgrade",134],["upgrade",135]]],
                ["row",[["upgrade",201],["upgrade",202],["upgrade",203],["upgrade",204],["upgrade",205]]],
               
            ]
        },
        "Challenges": {
            unlocked() {return (hasUpgrade("ba", 135))},
            content: [
                ["infobox", "challenge"],
                ["display-text",
                    function() {return 'You have ' + format(player.ba.en) + ' Enhancement Crystals'},
                     {"color": "purple" , "font-size": "20px"}],
                     "blank",
                "challenges"
            ]
        }
    },
    infoboxes: {
        mars: {
            title: "DOCUMENT MARS",
            titleStyle: {'color': '#000000'},
            body() { return "Welcome to mars! If you are reading this you were accepted into the mars programm. Your goal is to harvest energy from mars and to research about this planet. You even may harvest the energy of other planets!" },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        marsexplore: {
            title: "DOCUMENT EX0001",
            titleStyle: {'color': '#000000'},
            body() { return "You have succsessfully harvested enough energy and you are now ready the explore mars! You will start off by collecting rocks" },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        marsma: {
            title: "DOCUMENT EX0002",
            titleStyle: {'color': '#000000'},
            body() { return "You've collected your first mars rock! Now it is time to collect more. Soon your oxygen will run out so it will be time to grow plants." },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        enhance: {
            title: "DOCUMENT ENH000001",
            titleStyle: {'color': '#000000'},
            body() { return "These are enhancement crystals. They will enhance materials and will make it stronger. (When you respec it will also reset enhancement crystals)" },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        challenge: {
            title: "DOCUMENT ENH000002",
            titleStyle: {'color': '#000000'},
            body() { return "Complete these enhanced challenges to get enhanced rewards" },
            bodyStyle: {'background-color': "#4A2121"}
            
        },
        
    },
    challenges: {
        11: {
            name: "Energy",
            challengeDescription: "Point gain is divided by 3",
            canComplete: function() {return player.points.gte(1e117)},
            goalDescription: "Get 1e117 points",
            rewardDescription: "Enhancement crystals boost energy gain",
            rewardEffect() {
                return player.ba.en.add(1).pow(0.6)
            },
            style: {
                "background": "radial-gradient(purple, pink)" ,
            },
            rewardDisplay() {return format(tmp.ba.challenges[11].rewardEffect)+"x"},
        },
        12: {
            name: "Pure Pain",
            challengeDescription: "Point gain is divided by 2",
            canComplete: function() {return player.ba.points.gte(1e88)},
            goalDescription: "Get 1e88 pure power",
            style: {
                "background": "radial-gradient(purple, pink)" ,
            },
            rewardDescription: "Enhancement crystals extend the air barrier",
        },
    },
    buyables: {
        showRespec: true,
        respec() { // Optional, reset things and give back your currency. Having this function makes a respec button appear

            resetBuyables(this.layer),
            player.ba.rocks = new Decimal(1)
            player.ba.sand = new Decimal(1)
            player.ba.bact = new Decimal(1)
            player.ba.water = new Decimal(1)
            player.ba.dirt = new Decimal(1)
            player.ba.en = new Decimal(1)
            player.ba.air = new Decimal(1)
            player.ba.shard = new Decimal(1) // Force a reset
           
        },
        respecText: "RESPEC/SEARCH AGAIN", // Text on Respec button, optional
        respecMessage: "This will reset all mars materials!",
       
        11: {
            title: "Mars Rocks", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(35).mul(x).mul(1.25).div(player.ba.half1) },
            display() { // Everything else displayed in the buyable button after the title
                return " You explore and only find mars rocks the most common thing in the vast expanse of mars\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            respecText: "RESPEC/SEARCH AGAIN", // Text on Respec button, optional
            respecMessage: "You will lose all mars material if you do this.",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.rocks = player.ba.rocks.add(1)
            }
        
           
        },
        12: {
            title: "Mars Sand", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(100).mul(x).mul(1.3)},
            display() { // Everything else displayed in the buyable button after the title
                return " Sand is everywhere, but can still be used in important ways\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.sand = player.ba.sand.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",33))} 
        },
        13: {
            title: "Bacteria Samples", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(200).mul(x).mul(1.35)},
            display() { // Everything else displayed in the buyable button after the title
                return " If you take samples from a rock there is a chance that on the petri dish bacteria will start to form even though this is rarer than getting rocks\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.bact = player.ba.bact.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",43))}
        },
        21: {
            title: "Water Molecules", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(1e14).mul(x).mul(1.5)},
            display() { // Everything else displayed in the buyable button after the title
                return " In the air there are water molecules. They are very rare but will help enhance energy even further (Water molecules boost energy gain)\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.water = player.ba.water.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",75))}
        },
        22: {
            title: "Mars dirt", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(5e16).mul(x).mul(1.75)},
            display() { // Everything else displayed in the buyable button after the title
                return " The ground is a simple combination of molecules but this can be harvested for energy (dirt boosts energy gain)\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.dirt = player.ba.dirt.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",85)) || (hasUpgrade("ba",111))}
        },
        23: {
            title: "Air", // Optional, displayed at the top in a larger font
            cost(x) { return new Decimal(1e25).mul(x).mul(4)},
            display() { // Everything else displayed in the buyable button after the title
                return " Air is everywhere (Air boosts energy gain)\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.air = player.ba.air.add(1)
            },
            unlocked() { return  (hasUpgrade("ba",95))}
        },
        31: {
            title: "Mars Shards", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(1e30)
                let amt = getBuyableAmount("ba",31)
                let exp = amt.div(2)
                return init.pow(exp)
            },
            display() { // Everything else displayed in the buyable button after the title
                return " Mars shards are glass shards but glass (Mars shards boost pure power)\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure power"
                
            },
        
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.shard = player.ba.shard.add(1)
  
            },
            unlocked() {return hasUpgrade("ev",35)}
        },
        51: {
            title: "ENHANCEMENT CRYSTAL", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(1e29)
                let amt = getBuyableAmount("ba", 51)
                let exp = amt.div(10)
                return init.pow(exp)
            },
            display() { // Everything else displayed in the buyable button after the title
                return " Enhancement crystals resets all mars materials are you sure you want to get one?\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Pure Power"
                
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            style: {
                "background": "radial-gradient(purple, pink)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ba.en = player.ba.en.add(1)
                player.ba.rocks = new Decimal(0)
                player.ba.sand = new Decimal(0)
                player.ba.bact = new Decimal(0)
                player.ba.air = new Decimal(0)
                player.ba.water = new Decimal(0)
                player.ba.dirt = new Decimal(0)
               
            }
        }
    },
    clickables: {
        11: {
            display() {return "RESET UPGRADES"},
            canClick() {return true},
            onClick() {
                player.ba.upgrades = ["reset"]
                player.ba.as = player.ba.as = new Decimal(0)
            },
            
        },

        21: {
            display() {return "RESET ENHANCEMENTS (THIS WILL RESET ALL MATERIALS)"},
            canClick() {if (player.ba.ea == 1) return true},
            onClick() {
                player.ba.ea = new Decimal(0)
                player.ba.en = player.ba.en.add(1)
                player.ba.bdm = player.ba.obdm
                player.ba.bdm2 = player.ba.obdm2
                player.ba.pe = player.ba.pe = new Decimal(0)
                player.ba.rocks = player.ba.rocks = new Decimal(1)
                player.ba.sand = player.ba.sand = new Decimal(1)
                player.ba.bact = player.ba.bact = new Decimal(1)
                player.ba.air = player.ba.air = new Decimal(1)
                player.ba.dirt = player.ba.dirt = new Decimal(1)
                player.ba.water = player.ba.water = new Decimal(1)
                player.ba.bdm3 = player.ba.bdm3 = new Decimal(1)
                player.ba.baen = player.ba.baen = new Decimal(0)
                player.ba.aso = player.ba.aso = new Decimal(1e12)
                player.ba.oxbo = player.ba.oxbo = new Decimal(1)
            },
            style: {
                "background-color"() {

                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        31: {
            display() {return "MARS ROCK ENHANCEMENT"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.obdm = new Decimal(player.ba.bdm)
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.bdm = player.ba.bdm = new Decimal(1e12)
                    },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            
            },
            
        },
        32: {
            display() {return "MARS SAND ENHANCEMENT"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.obdm2 = new Decimal(player.ba.bdm2)
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.bdm2 = player.ba.bdm2 = new Decimal(1e11)
            },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        33: {
            display() {return "BACTERIA SAMPLES ENHANCEMENT"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.bdm3 = player.ba.bdm3 = new Decimal(500)
            },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        41: {
            display() {return "ENERGY ENHANCEMENT (energy gain boosted by enhancements)"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.pe = player.ba.pe = new Decimal(1)
            },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        42: {
            display() {return "PURE POWER ENHANCEMENT (pure power gain boosted by enhancements)"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.baen = player.ba.baen = new Decimal(1)
            },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        43: {
            display() {return "AIR ENHANCEMENT (Extend the air barrier)"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.aso = player.ba.aso.mul(player.ba.en)
            },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        },
        51: {
            display() {return "Oxygen Enhancement (Oxygen boosts pure power x 25)"},
            canClick() {if (player.ba.ea == 0 && player.ba.en.gte(1)) return true},
            onClick() {
                    player.ba.ea = new Decimal(1)
                    player.ba.en = player.ba.en.sub(1)
                    player.ba.oxbo = player.o.points
            },
            style: {
                "background-color"() {
                    let color = "#C800FD"
                    return color
                    
                }
            },
            
        }
        
    },
    upgrades: {
        11: {
            title: "Fresh start",
            description: "Begin to harvest energy from mars.",
            cost: new Decimal(0),
        },
        12: {
            title: "Robotic Inspection",
            description: "Inspecting the robots.... And... Ok they seem to be in perfect condition. (x2 energy gain)",
            cost: new Decimal(5),
        },
        13: {
            title: "Latest Bolts",
            description: "Man... I didn't know amazon sold these futurisitc bolts. (x2 energy gain)",
            cost: new Decimal(10),
        },
        21: {
            title: "New Wrench",
            description: "I need a new wrench (x3 energy gain)",
            cost: new Decimal(10),
            unlocked() { return (hasUpgrade(this.layer, 13))}, 
        },
        22: {
            title: "POWER",
            description: "The pure power is getting STRONGER! (Pure power boosts energy gain)",
            cost: new Decimal(20),
            unlocked() { return (hasUpgrade(this.layer, 13))}, 
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        
        },
        23: {
            title: "Expedition",
            description: "It's time to explore mars.",
            cost: new Decimal(50),
            unlocked() { return (hasUpgrade(this.layer, 13))}, 
        },
        31: {
            title: "Rover Update",
            description: "The rover doesnt understand the difference between rocks and dust... (The cost for the mars rocks buyable is cheaper)",
            cost: new Decimal(2),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            effectDisplay() { return format(player.ba.half1) + "/" },
            unlocked() { return (hasUpgrade("ba",23))}, 
            onPurchase() {
                player.ba.half1 = player.ba.half1.add(1)
            },
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",31)) color = "#A70000"
                    return color
                    
                }
            }
        },
        32: {
            title: "Useful rocks",
            description: "The mars rocks can be harvested for energy! (Mars rocks boosts energy)",
            cost: new Decimal(3),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",31))}, 
             style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",32)) color = "#A70000"
                    return color
                    
                }
            },
            effect() {
                return player.ba.rocks.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },
        33: {
            title: "New capabilities",
            description: "The rovers are now able to pick up Mars sand",
            cost: new Decimal(5),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",32))},
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",33)) color = "#A70000"
                    return color
                    
                }
            }
        },
        34: {
            title: "Extensive Research",
            description: "These mars rocks could be used to harvest so much energy... If only there were a way... (x3 energy gain)",
            cost: new Decimal(7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",33))},
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",34)) color = "#A70000"
                    return color
                    
                }
            }
        },
        35: {
            title: "Potential",
            description: "There has to be a way to refine these rocks into ores.. Or what if there are ores on mars! I have to start worrying about oxygen soon... (x3 energy gain again)",
            cost: new Decimal(10),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))},
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",35)) color = "#A70000"
                    return color
                    
                }
            }
        },
        71: {
            title: "Rock energy conversion I",
            description: "The mars rocks true potential is drawing ever closer I just need some sort of amplifier... (Mars rocks boost energy gain)",
            cost: new Decimal(5e6),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            effect() {
                return player.ba.rocks.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",71)) color = "#A70000"
                    return color
                    
                }
            }
        },
        72: {
            title: "Rock energy conversion II",
            description: "Bacteria seems to be more powerful its mulitplying so quickly! (Bacteria boosts mars rocks better)",
            cost: new Decimal(1e7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd1 = new Decimal(2)
            },
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",72)) color = "#A70000"
                    return color
                    
                }
            }
        },
        73: {
            title: "Rock energy conversion III",
            description: "Bacteria... power... YES.... (Bacteria boosts mars rocks even better)",
            cost: new Decimal(1.5e7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd1 = new Decimal(1.25)
                player.ba.bdm = new Decimal(5)
            },
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",73)) color = "#A70000"
                    return color
                    
                }
            }
        },
        74: {
            title: "Rock energy conversion IV",
            description: "This is the maximum potential... finally! (Bacteria boosts mars rocks much better)",
            cost: new Decimal(3e7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd1 = new Decimal(1.1)
                player.ba.bdm = new Decimal(15)
            },
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",74)) color = "#A70000"
                    return color
                    
                }
            }
        },
        75: {
            title: "Water Molecules",
            description: "There seems to be some water molecules around the place (Unlock new mars material)",
            cost: new Decimal(6e7),
            currencyInternalName: "rocks",
            currencyDisplayName: "Mars rocks",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            style: {
                "background-color"() {

                    let color = "#FF8585"
                    if (hasUpgrade("ba",75)) color = "#A70000"
                    return color
                    
                }
            }
        },
        41: {
            title: "Sand filter",
            description: "Now that we have higher quality sand I can turn it into energy (Sand boosts energy)",
            cost: new Decimal(3),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",33))},
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",41)) color = "#D0BE8A"
                    return color
                    
                }
            },
            effect() {
                return player.ba.sand.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        42: {
            title: "Sand Research",
            description: "You found out that there are mars sand grains in mars rocks after researching so now you can purify the mars rocks. (Mars rocks are cheaper)",
            cost: new Decimal(4),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))},
            onPurchase() {
                player.ba.half1 = player.ba.half1.add(1)
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",42)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        43: {
            title: "Bacteria samples",
            description: "Its time to find bacteria samples! (unlock bacteria samples)",
            cost: new Decimal(5),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))},
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",43)) color = "#D0BE8A"
                    return color
                    
                }
            },
        },
        44: {
            title: "Rock Drones",
            description: "Drones are now collecting rocks for you easier",
            cost: new Decimal(10),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",34))},
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",44)) color = "#D0BE8A"
                    return color
                    
                }
            },
        },
        45: {
            title: "High quality sand",
            description: "Sand is now higher quality after some research (Sand boosts energy even better)",
            cost: new Decimal(35),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            effect() {
                return player.ba.sand.add(1).pow(0.55)
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",45)) color = "#D0BE8A"
                    return color
                    
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        81: {
            title: "Sand energy conversion I",
            description: "The sand is more powerful (Bacteria boosts mars sand)",
            cost: new Decimal(3e6),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd2 = new Decimal(2.8)
                player.ba.bdm2 = new Decimal(1.3)
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",81)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        82: {
            title: "Sand energy conversion II",
            description: "The sand is even more powerful (Bacteria boosts mars sand even more)",
            cost: new Decimal(5e6),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd2 = new Decimal(2.5)
                player.ba.bdm2 = new Decimal(2)
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",82)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        83: {
            title: "Sand energy conversion III",
            description: "The sand is so powerful (Bacteria boosts mars sand so much more)",
            cost: new Decimal(5e6),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            onPurchase() {
                player.ba.bd2 = new Decimal(1.5)
                player.ba.bdm2 = new Decimal(4)
            },
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",83)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        84: {
            title: "Sand energy conversion IV",
            description: "The pure power is now sand? Uhhhhhhhh.  (Sand boosts pure power)",
            cost: new Decimal(2e7),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            effect() {
                return player.ba.water.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",84)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        85: {
            title: "Ground",
            description: "The rover can now dig up mars dirt (unlock a new mars material)",
            cost: new Decimal(3e7),
            currencyInternalName: "sand",
            currencyDisplayName: "Mars Sand",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",12))},
            style: {
                "background-color"() {

                    let color = "#FFFED6"
                    if (hasUpgrade("ba",85)) color = "#D0BE8A"
                    return color
                    
                }
            },
           
        },
        51: {
            title: "Pure Harvesting",
            description: "Pure power is now easier to harvest with new technology. (100% automatic gain for Pure Power)",
            cost: new Decimal(2),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",51)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        52: {
            title: "Bacteria Rocks",
            description: "Bacteria seems to enhance the rocks giving it more energy (Bacteria boosts mars rocks gain)",
            cost: new Decimal(8),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",52)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        53: {
            title: "Sand Drones",
            description: "Drones will now carry sand as well (gain 0.01 sand automatically)",
            cost: new Decimal(15),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",53)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        54: {
            title: "New POWER",
            description: "There is more ENERGY THE POWER INCREASES!",
            cost: new Decimal(17),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",54)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        55: {
            title: "Bacteria Infected Sand",
            description: "Bacteria seems to enhance the sand aswell giving it more energy (Bacteria boosts mars sand gain)",
            cost: new Decimal(600),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",43))},
            onPurchase() {
                player.ba.as = player.ba.as.add(1)
            },
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",55)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        91: {
            title: "Automatic collection",
            description: "Drones will collect samples automatically (Gain 0.1 bacteria samples/s)",
            cost: new Decimal(2000),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",91)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        92: {
            title: "Oxygen injection",
            description: "injecting oxygen makes bacteria multiply (Gain bacteria samples based on oxygen)",
            cost: new Decimal(2100),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",92)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        93: {
            title: "BACTERIA MUTATION I",
            description: "There is a new mutation of this bacteria it seems to have adapted to this enviorment (Gain more mars rocks)",
            cost: new Decimal(2e5),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            onPurchase() {
                player.ba.bdm = new Decimal(30)
            },
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",93)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        94: {
            title: "BACTERIA MUTATION II",
            description: "There are new mutation of this bacteria (Gain even more mars rocks)",
            cost: new Decimal(4e5),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            onPurchase() {
                player.ba.bdm = new Decimal(50)
            },
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",94)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        95: {
            title: "BACTERIA MUTATION III",
            description: "MUTATE (Gain even more mars rocks and unlock a new mars material)",
            cost: new Decimal(5e5),
            currencyInternalName: "bact",
            currencyDisplayName: "Bacteria Samples",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("o",13))},
            onPurchase() {
                player.ba.bdm = new Decimal(3e4)
            },
            style: {
                "background-color"() {

                    let color = "#84FF97"
                    if (hasUpgrade("ba",95)) color = "#0E8A0E"
                    return color
                    
                }
            },
        },
        101: {
            title: "Water power",
            description: "Water molecules enhance energy (Water molecules boosts energy)",
            cost: new Decimal(95),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",75))},
            effect() {
                return player.ba.water.add(1).pow(0.63)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",101)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        102: {
            title: "Pure water power",
            description: "Water molecules enhance pure energy (Water molecules boosts energy)",
            cost: new Decimal(130),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",75))},
            effect() {
                return player.ba.water.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",102)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        103: {
            title: "[???]",
            description: "[REDACTED]",
            cost: new Decimal(1200),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",75))},
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",103)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        104: {
            title: "Operation: RESTORATION",
            description: "You've gotten so far... Now its time to make mars habitable",
            cost: new Decimal(0),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",103))},
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",104)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        105: {
            title: "Enviorment",
            description: "Unlock enviorment (Coming soon)",
            cost: new Decimal(0),
            currencyInternalName: "water",
            currencyDisplayName: "Water Molecules",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",104))},
            style: {
                "background-color"() {

                    let color = "#75F9F3"
                    if (hasUpgrade("ba",105)) color = "#02E3FF"
                    return color
                    
                }
            },
        },
        111: {
            title: "Dirt Power",
            description: "The dirt also enhances energy yay (dirt boosts energy)",
            cost: new Decimal(150),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",85))},
            effect() {
                return player.ba.water.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",111)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        112: {
            title: "Dirt Collecter Drones",
            description: "Drones now have the capability to collect dirt (Automatically gain 0.1 dirt/s)",
            cost: new Decimal(300),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",85))},
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",112)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        113: {
            title: "Pure Dirt Power",
            description: "The dirt enhances pure energy too (dirt boosts pure energy)",
            cost: new Decimal(650),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",85))},
            effect() {
                return player.ba.water.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",113)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        114: {
            title: "Automatic water collection",
            description: "Drones collect water molecules (gain 0.1 water molecule/s)",
            cost: new Decimal(800),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",85))},
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",114)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        115: {
            title: "ENHANCEMENT",
            description: "with these machines I can enhance the materials (Unlock the enhancement tab)",
            cost: new Decimal(1e3),
            currencyInternalName: "dirt",
            currencyDisplayName: "Mars Dirt",
            currencyLayer: "ba",
            unlocked() { return (hasUpgrade("ba",85))},
            style: {
                "background-color"() {

                    let color = "#8A5B4C"
                    if (hasUpgrade("ba",115)) color = "#A0330F"
                    return color
                    
                }
            },
        },
        131: {
            title: "MAXIMIZE I",
            description: "Enhancement cystals enhance mars rocks",
            cost: new Decimal(5),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
             effectDisplay() { return format(player.ba.en)+"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",131)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        132: {
            title: "MAXIMIZE II",
            description: "Enhancement cystals enhance mars sand",
            cost: new Decimal(10),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
             effectDisplay() { return format(player.ba.en.div(1.5)) +"x" }, // Add formatting to the effect
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",132)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        133: {
            title: "BOOST I",
            description: "Boost sand",
            cost: new Decimal(3),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            onPurchase() {
                player.ba.bdm2 = player.ba.bdm2 = new Decimal(1e3)
            },
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",133)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        134: {
            title: "BOOST II",
            description: "Boost mars rocks",
            cost: new Decimal(15),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            onPurchase() {
                player.ba.bdm = player.ba.bdm.add(1e6)
            },
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",134)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        135: {
            title: "CHALLENGING",
            description: "Unlock enhanced challenges",
            cost: new Decimal(30),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",135)) color = "#C411FF"
                    return color
                    
                }
            },
        },
        201: {
            title: "BOOST III",
            description: "Boost mars rocks even more",
            cost: new Decimal(30),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",201)) color = "#C411FF"
                    return color
                    
                }
            },
             onPurchase() {
                player.ba.bdm = player.ba.bdm.add(1e7)
            },
            unlocked() {return hasUpgrade("ba",135)}
        },
        202: {
            title: "BOOST IV",
            description: "Boost mars sand even more",
            cost: new Decimal(30),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",202)) color = "#C411FF"
                    return color
                    
                }
            },
             onPurchase() {
                player.ba.bdm2 = player.ba.bdm2.add(1e4)
            },
            unlocked() {return hasUpgrade("ba",135)}
        },
        203: {
            title: "BOOST V",
            description: "Boost mars rocks EVEN MORE",
            cost: new Decimal(32),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",203)) color = "#C411FF"
                    return color
                    
                }
            },
             onPurchase() {
                player.ba.bdm = player.ba.bdm.add(1e8)
            },
            unlocked() {return hasUpgrade("ba",135)}
        },
        204: {
            title: "BOOST VI",
            description: "Boost mars rocks SO MUCH MORE",
            cost: new Decimal(32),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",204)) color = "#C411FF"
                    return color
                    
                }
            },
             onPurchase() {
                player.ba.bdm = player.ba.bdm.add(1e10)
            },
            unlocked() {return hasUpgrade("ba",135)}
        },
        205: {
            title: "ULTRA BOOST",
            description: "Boost mars rocks and mars sand SO MUCH MORE",
            cost: new Decimal(40),
            currencyInternalName: "en",
            currencyDisplayName: "Enhancement Crystals",
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#E493FF"
                    if (hasUpgrade("ba",205)) color = "#C411FF"
                    return color
                    
                }
            },
             onPurchase() {
                player.ba.bdm = player.ba.bdm.add(1e12)
                player.ba.bdm2 = player.ba.bdm2.add(1e6)
            },
            unlocked() {return hasUpgrade("ba",135)}
        },
        141: {
            title: "Air flow",
            description: "Air is automatically collected (gain 0.1 air/s)",
            cost: new Decimal(50),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            currencyLayer: "ba",
            unlocked() {return hasUpgrade("ba",95)},
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",141)) color = "#BFBFBF"
                    return color
                    
                }
            },
        },
        142: {
            title: "Dirt flow",
            description: "Air flows through the dirt making the dirt stronger??? idk (Air boosts dirt)",
            cost: new Decimal(75),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            currencyLayer: "ba",
            unlocked() {return hasUpgrade("ba",95)},
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",142)) color = "#BFBFBF"
                    return color
                    
                }
            },
        },
        143: {
            title: "Water flow",
            description: "Air flows through the water making the water store more energy (Air boosts water)",
            cost: new Decimal(200),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            currencyLayer: "ba",
            unlocked() {return hasUpgrade("ba",95)},
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",143)) color = "#BFBFBF"
                    return color
                    
                }
            },
        },
        144: {
            title: "Flowing flow",
            description: "Air flows through the air making the air store more energy  (Air boosts air)",
            cost: new Decimal(500),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            unlocked() {return hasUpgrade("ba",95)},
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",144)) color = "#BFBFBF"
                    return color
                    
                }
            },
        },
        145: {
            title: "Maximum air",
            description: "Air flows through the air quicker making the air store more energy  (Air boosts air quicker)",
            cost: new Decimal(1e12),
            currencyInternalName: "air",
            currencyDisplayName: "Air",
            unlocked() {return hasUpgrade("ba",95)},
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#FDFFFE"
                    if (hasUpgrade("ba",145)) color = "#BFBFBF"
                    return color
                    
                }
            },
        },
        161: {
            title: "SHARD",
            description: "Mars shards boost pure power",
            cost: new Decimal(5),
            currencyInternalName: "shard",
            currencyDisplayName: "Mars Shard",
            unlocked() {return hasUpgrade("ev",35)},
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#FDEEEE"
                    if (hasUpgrade("ba",161)) color = "gray"
                    return color
                    
                }
            },
        },
        162: {
            title: "SHARP",
            description: "Mars shards boost pure power even more",
            cost: new Decimal(8),
            currencyInternalName: "shard",
            currencyDisplayName: "Mars Shard",
            unlocked() {return hasUpgrade("ev",35)},
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#FDEEEE"
                    if (hasUpgrade("ba",162)) color = "gray"
                    return color
                    
                }
            },
        },
        163: {
            title: "SHARPER",
            description: "Mars shards boost pure power MORE",
            cost: new Decimal(13),
            currencyInternalName: "shard",
            currencyDisplayName: "Mars Shard",
            unlocked() {return hasUpgrade("ev",35)},
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#FDEEEE"
                    if (hasUpgrade("ba",163)) color = "gray"
                    return color
                    
                }
            },
        },
        164: {
            title: "SHARPEST",
            description: "Mars shards boost pure power M(ORE)",
            cost: new Decimal(15),
            currencyInternalName: "shard",
            currencyDisplayName: "Mars Shard",
            unlocked() {return hasUpgrade("ev",35)},
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#FDEEEE"
                    if (hasUpgrade("ba",164)) color = "gray"
                    return color
                    
                }
            },
        },
        165: {
            title: "Mining",
            description: "Unlock the Mine layer",
            cost: new Decimal(16),
            currencyInternalName: "shard",
            currencyDisplayName: "Mars Shard",
            unlocked() {return hasUpgrade("ev",35)},
            currencyLayer: "ba",
            style: {
                "background-color"() {

                    let color = "#FDEEEE"
                    if (hasUpgrade("ba",165)) color = "gray"
                    return color
                    
                }
            },
        },
        61: {
            title: "ROCK POTENTIAL ULTRA",
            description: "The rocks are so strong. Who knew that they would make enough energy to keep the lights on to a city for a week! (Mars rocks boost Pure power)",
            cost: new Decimal(30000),
            unlocked() { return (hasUpgrade("ba",54))},
            effect() {
                return player.ba.rocks.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        62: {
            title: "SAND POTENTIAL ULTRA",
            description: "The sand is so bright and strong. THIS IS POWER! (Mars sand boost Pure power)",
            cost: new Decimal(1e6),
            unlocked() { return (hasUpgrade("ba",54))},
            effect() {
                return player.ba.sand.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        63: {
            title: "CRITICAL WARNING!",
            description: "OXYGEN RUNNING DANGEROUSLY LOW PLEASE START GROWING PLANTS FROM THE STARTER PACK (Unlock the Oxygen layer)",
            cost: new Decimal(3e11),
            unlocked() { return (hasUpgrade("ba",62))},
        }
        
    }

}),
addLayer("d", {
    name: "Drills", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MINE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        rd: new Decimal(0),
        db: new Decimal(0),
        dbm: new Decimal(1),
        wd: new Decimal(0),
        sd: new Decimal(0),
        ub: new Decimal(1),
        ird: new Decimal(0),
        cand: new Decimal(1),
        md: new Decimal(0),
        prefix: new Decimal(0),
        begin: new Decimal(0),
        mdgain: new Decimal(0.25),
        mm: new Decimal(1),
        mbest: new Decimal(0),
        mlt: new Decimal(1),
        newton: new Decimal(0),
        jo: new Decimal(0),
        jou1: new Decimal(1),
        jm: new Decimal(1),
        newt1: new Decimal(1),
        gd: new Decimal(0),
        gdb: new Decimal(1)
    }},
    color: "#9E8E2A",
    requires: new Decimal(1e120), // Can be a function that takes requirement increases into account
    resource: "Drills", // Name of prestige currency
    baseResource: "Pure Power", // Name of resource prestige is based on
    baseAmount() {return player.ba.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
            if (hasUpgrade("d",66)) mult = mult.times(player.d.newton)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for Drills", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        if (hasUpgrade("ba",165)) return true
    },
    update(diff) {
        player.d.db = player.d.db.add(player.d.points.mul(player.d.dbm.mul(player.d.newt1))*diff)
        if (hasUpgrade("d",23)) player.d.dbm = player.d.dbm.add(upgradeEffect("d",23))
        if (hasUpgrade("d",62)) player.d.dbm = player.d.dbm.add(upgradeEffect("d",62))
        if (hasUpgrade("o",33)) player.d.dbm = player.d.dbm.add(upgradeEffect("o",33))
        if (hasUpgrade("d",54)) player.d.mlt = player.d.points
        if (player.d.gd.gte(1)) player.d.dbm = player.d.dbm.add(player.d.gdb.mul(player.d.gdb.mul(player.d.gdb)))
        if (player.d.gd.gte(1)) player.d.gdb = new Decimal(player.d.gd)
        if (player.d.md.gte(5000)) player.d.mdgain = new Decimal(0.0000001)
        if (hasUpgrade("d",72)) player.d.jou1 = player.d.newton.mul(player.d.jm)
        if (hasUpgrade("d",75)) player.d.newt1 = player.d.newton
        if (player.d.newton.gte(1)) player.d.jo = player.d.jo.add(player.d.newton.mul(player.d.jou1.mul(player.d.jm))*diff)
        if (player.d.md.gte(1000) && !player.d.md.gte(5000)) player.d.mdgain = new Decimal(0.0001)
        if (player.d.md.gte(500) && !player.d.md.gte(1000)) player.d.mdgain = new Decimal(0.001)
        if (player.d.md.gte(100) && !player.d.md.gte(500)) player.d.mdgain = new Decimal(0.01)
        if (player.d.md.gte(30) && !player.d.md.gte(100)) player.d.mdgain = new Decimal(0.1)
        if (player.d.md.gte(0) && !player.d.md.gte(30)) player.d.mdgain = new Decimal(1)
        player.d.mbest = player.d.mbest.max(player.d.md)
        if (player.d.db < -1) player.d.db = new Decimal(1)
        setBuyableAmount('d', 51, new Decimal(player.d.newton))
        if (player.d.begin == 1) player.d.md = player.d.md.add(player.d.mdgain.mul(player.d.mm).mul(player.d.mlt)*diff)
       // setBuyableAmount('d', 11, new Decimal(0))
           
    },
    branches: ['ba','o'],
    resetsNothing() {return true},
    tabFormat: {
        "Drills": {
            content: [
                ["microtabs","drill"],
            ],
            buttonStyle: {"border-color": "gold"},
            
        },
        "Energy": {
            content: [
                ["microtabs","energy"],
            ],
            buttonStyle: {"border-color": "#FFAA00"},
            unlocked() {return hasUpgrade("d",65)}
        },
    },
    microtabs: {
        energy: {
            "Joules": {
                content: [
                    ["display-text",
                        function() {return 'You have ' + format(player.d.newton) + ' Newtons'},
                        {"color": "cyan" , "font-size": "20px"}],
                    ["display-text",
                            function() {return 'You are gaining ' + format(player.d.newton.mul(player.d.jou1).mul(player.d.jm)) + ' Joules/s'},
                            {"color": "gold" , "font-size": "20px"}],
                            ["display-text",
                                function() {return 'You have ' + format(player.d.jo) + ' Joules'},
                                {"color": "gold" , "font-size": "20px"}],
                    ["row",[["buyable",51]]],
                    ["row",[["upgrade",71],["upgrade",72],["upgrade",73],["upgrade",74],["upgrade",75],["upgrade",76]]],
                    ["row",[["upgrade",91],["upgrade",92],["upgrade",93],["upgrade",94],["upgrade",95],["upgrade",96]]]
                ]
            }
        },
        drill: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                ["display-text",
                        function() {return 'Drills boost pure power by ' + format(player.d.points.mul(300).mul(player.d.ub)) + ' x'},
                        {"color": "gold" , "font-size": "20px"}],
                    ["display-text",
                        function() {return 'Drills gives ' + format(player.d.points.mul(player.d.dbm)) + ' Drill bits/s'},
                        {"color": "gold" , "font-size": "20px"}],
                     ["display-text",
                        function() {return 'You have ' + format(player.d.db) + ' Drill bits'},
                        {"color": "gold" , "font-size": "16px"}],
                ["display-text",
                        function() {return 'You have ' + format(player.d.rd) + ' Rusty Drills'},
                        {"color": "brown" , "font-size": "16px"}],
                        ["display-text",
                            function() {return 'You have ' + format(player.d.wd) + ' Wooden Drills'},
                            {"color": "brown" , "font-size": "16px"}],
             ["display-text",
                            function() {return 'You have ' + format(player.d.sd) + ' Stone Drills'},
                            {"color": "gray" , "font-size": "16px"}],
                            ["display-text",
                                function() {return 'You have ' + format(player.d.ird) + ' Iron Drills'},
                                {"color": "white" , "font-size": "16px"}],
               ["display-text",
          function() {return 'You have ' + format(player.d.gd) + ' Gold Drills'},
                                    {"color": "gold" , "font-size": "16px"}],
                ["row",[["buyable",11],["buyable",12],["buyable",13]]],
                ["row",[["buyable",21],["buyable",22]]]
            ]
        },
        "Upgrades": {
            content: [
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15],["upgrade",16]]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25],["upgrade",26]]],
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35],["upgrade",36]]],
                ["row",[["upgrade",61],["upgrade",62],["upgrade",63],["upgrade",64],["upgrade",65],["upgrade",66]]],
                ["row",[["upgrade",81],["upgrade",82],["upgrade",83],["upgrade",84],["upgrade",85],["upgrade",86]]]
            ]
        },
        "Drilling": {
            content: [
             ["display-text",
                            function() {return 'You have drilled ' + format(player.d.md) + 'm' + ' Dug'},
                            {"color": "gray" , "font-size": "20px"}],
                            ["display-text",
                            function() {return 'The deepest you dug is ' + format(player.d.mbest) + ' meters'},
                            {"color": "gray" , "font-size": "16px"},],
                            ["display-text",
                            function() {return 'The deeper you drill the harder it gets.'},
                            {"color": "gray" , "font-size": "16px"},
                           
                            ],
                ["row",[["clickable",11],["clickable",12]]],
                "blank",
                ["row",[["upgrade",41],["upgrade",42],["upgrade",43],["upgrade",44],["upgrade",45],["upgrade",46]]],
                ["row",[["upgrade",51],["upgrade",52],["upgrade",53],["upgrade",54],["upgrade",55],["upgrade",56]]],
            ],
            unlocked() {return hasUpgrade("d",36)}
        }
    }
    },
    clickables: {
         11: {
            display() {return "Begin Drilling"},
            canClick() {if (player.d.cand == 1) return true},
            onClick() {
                    player.d.cand = new Decimal(0)
                    player.d.begin = new Decimal(1)
            },      
        },
         12: {
            display() {return "End Drilling"},
            canClick() {if (player.d.cand == 0) return true},
            onClick() {
                    player.d.cand = new Decimal(1)
                    player.d.md = new Decimal(0)
                    player.d.begin = new Decimal(0)
            },      
        },
    },
    upgrades: {
        11: {
             title: "D-1",
            description: "Unlock rusty drills",
            cost: new Decimal(5)
        },
        12: {
            title: "D-2",
           description: "Point gain x2^1.01",
           cost: new Decimal(6)
        },
        13: {
            title: "D-3",
            description: "Pure power gain x4^1.02",
            cost: new Decimal(7)
        },
        14: {
            title: "D-4",
            description: "x2 drill bit gain",
            cost: new Decimal(1.5e3),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.dbm = player.d.dbm = new Decimal(2)
            }

        },
        15: {
            title: "D-5",
            description: "x4 drill bit gain",
            cost: new Decimal(2e3),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.dbm = player.d.dbm = new Decimal(4)
            }
        },
        16: {
            title: "D-6",
            description: "x8 drill bit gain",
            cost: new Decimal(6e3),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.dbm = player.d.dbm = new Decimal(8)
            }
        },
        21: {
            title: "D-7",
            description: "x20 drill bit gain",
            cost: new Decimal(1.5e4),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.dbm = player.d.dbm = new Decimal(20)
            }
        },
        22: {
            title: "D-8",
            description: "x65 drill bit gain",
            cost: new Decimal(2e4),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.dbm = player.d.dbm = new Decimal(65)
            }
        },
        23: {
            title: "D-9",
            description: "Upgrade effect adds drill bits gain",
            cost: new Decimal(4e4),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            effect() {
                return player.d.points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "D-10",
            description: "Unlock wooden drills",
            cost: new Decimal(5e6),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
        },
        25: {
            title: "D-11",
            description: "Unlock stone drills",
            cost: new Decimal(1e7),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
        },
        26: {
            title: "D-12",
            description: "x2 drill mulitiplier",
            cost: new Decimal(2e7),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.ub = player.d.ub = new Decimal(2)
            }
        },
        31: {
            title: "D-13",
            description: "x4 drill mulitiplier",
            cost: new Decimal(2.5e7),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.ub = player.d.ub = new Decimal(4)
            },
            unlocked() {return hasUpgrade("d",26)}
        },
        32: {
            title: "D-14",
            description: "Gain more drill bits",
            cost: new Decimal(3e7),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.dbm = player.d.dbm.add(100)
            },
            unlocked() {return hasUpgrade("d",26)}
        },
        33: {
            title: "D-15",
            description: "Gain even more drill bits",
            cost: new Decimal(3.5e7),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.dbm = player.d.dbm.add(1e4)
            },
            unlocked() {return hasUpgrade("d",26)}
        },
        34: {
            title: "D-16",
            description: "More drill bits",
            cost: new Decimal(5e7),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            onPurchase() {
                player.d.dbm = player.d.dbm.add(1e5)
            },
            unlocked() {return hasUpgrade("d",26)}
        },
        35: {
            title: "D-17",
            description: "Green drills? (Unlock iron drills)",
            cost: new Decimal(1e8),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",26)}
        },
        36: {
            title: "Mining (D-18)",
            description: "Unlock Drilling",
            cost: new Decimal(2e8),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",26)}
        },
        61: {
            title: "D-19",
            description: "Boost drill bits",
            cost: new Decimal(2.5e8),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",56)},
            onPurchase() {
                player.d.dbm = player.d.dbm.add(1e6)
            },
        },
        62: {
            title: "D-20",
            description: "Drills boost drill bits even more",
            cost: new Decimal(3e8),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",56)},
            effect() {
                return player.d.points.add(1).pow(0.55)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        63: {
            title: "D-21",
            description: "Pure power gain x12^1.03",
            cost: new Decimal(5e8),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",56)},
        },
        64: {
            title: "D-22",
            description: "Pure power gain x14^1.035",
            cost: new Decimal(6e8),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",56)},
        },
        65: {
            title: "Joules (D-23)",
            description: "Unlock Energy",
            cost: new Decimal(8),
            unlocked() {return hasUpgrade("d",56)},
        },
        66: {
            title: "D-24",
            description: "Newtons boost drill gain",
            cost: new Decimal(5e9),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",56)},
        },
        81: {
            title: "D-25",
            description: "Unlock gold drills",
            cost: new Decimal(2e10),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",66)},
        },
        82: {
            title: "D-26",
            description: "x1e3 bacteria gain",
            cost: new Decimal(5.5e10),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",66)},
            onPurchase() {
                player.ba.bactmul = new Decimal(1e3)
            },
        },
        83: {
            title: "D-27",
            description: "x1e4 bacteria gain",
            cost: new Decimal(1e11),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",66)},
            onPurchase() {
                player.ba.bactmul = new Decimal(1e4)
            },
        },
        84: {
            title: "D-28",
            description: "x1e6 bacteria gain",
            cost: new Decimal(1.5e11),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",66)},
            onPurchase() {
                player.ba.bactmul = new Decimal(1e6)
            },
        },
        85: {
            title: "D-29",
            description: "x1e10 bacteria gain",
            cost: new Decimal(3e11),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",66)},
            onPurchase() {
                player.ba.bactmul = new Decimal(1e10)
            },
        },
        86: {
            title: "D-30",
            description: "Newtons make drill bits cheaper",
            cost: new Decimal(4e11),
            currencyDisplayName: "Drill bits",
            currencyInternalName: "db",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",66)},
        },
        41: {
            title: "Shovel",
            description: "Gain more drill bits",
            cost: new Decimal(15),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",36)},
              onPurchase() {
                player.d.dbm = player.d.dbm.add(4e5)
            },
        },
        42: {
            title: "Drill",
            description: "+x2 digging power",
            cost: new Decimal(35),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",36)},
              onPurchase() {
                player.d.mm = player.d.mm.add(2)
            },
        },
        43: {
            title: "Jackhammer",
            description: "+x4 digging power",
            cost: new Decimal(40),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",36)},
              onPurchase() {
                player.d.mm = player.d.mm.add(4)
            },
        },
        44: {
            title: "Pickaxe",
            description: "+x6 digging power",
            cost: new Decimal(45),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",36)},
              onPurchase() {
                player.d.mm = player.d.mm.add(6)
            },
        },
        45: {
            title: "Dynamite",
            description: "+x12 digging power",
            cost: new Decimal(55),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",36)},
              onPurchase() {
                player.d.mm = player.d.mm.add(12)
            },
        },
        46: {
            title: "TNT",
            description: "+x30 digging power",
            cost: new Decimal(65),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",36)},
              onPurchase() {
                player.d.mm = player.d.mm.add(30)
            },
        },
        51: {
            title: "Super drill",
            description: "+x140 digging power",
            cost: new Decimal(140),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",46)},
              onPurchase() {
                player.d.mm = player.d.mm.add(140)
            },
        },
        52: {
            title: "Reinforced drill",
            description: "+x300 digging power",
            cost: new Decimal(160),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",46)},
              onPurchase() {
                player.d.mm = player.d.mm.add(300)
            },
        },
        53: {
            title: "Reinforced drill",
            description: "+x600 digging power",
            cost: new Decimal(180),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",46)},
              onPurchase() {
                player.d.mm = player.d.mm.add(600)
            },
        },
        54: {
            title: "Power Drill",
            description: "Drills boost digging power",
            cost: new Decimal(500),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",46)}
        },
        55: {
            title: "XXL Pickaxe",
            description: "+x2e3 digging power",
            cost: new Decimal(700),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",46)},
            onPurchase() {
                player.d.mm = player.d.mm.add(2e3)
            },
        },
        56: {
            title: "Mega Jackhammer",
            description: "+x1e4 digging power and more drills upgrades",
            cost: new Decimal(1000),
            currencyDisplayName: "Meters dug",
            currencyInternalName: "md",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",46)},
            onPurchase() {
                player.d.mm = player.d.mm.add(1e4)
            },
        },
        71: {
            title: "Energetical",
            description: "Joules boost energy gain",
            cost: new Decimal(1000),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",55)},
        },
        72: {
            title: "Zap",
            description: "Newtons boost joules",
            cost: new Decimal(2500),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",55)},
        },
        73: {
            title: "Electrical",
            description: "+x2 joules gain",
            cost: new Decimal(6000),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",55)},
            onPurchase() {
                player.d.jm = player.d.jm.add(2)
            },
        },
        74: {
            title: "Shock",
            description: "+x4 joules gain",
            cost: new Decimal(6e4),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",55)},
            onPurchase() {
                player.d.jm = player.d.jm.add(4)
            },
        },
        75: {
            title: "Boosted",
            description: "newtons boost drill bits and +x6 joules gain",
            cost: new Decimal(2e5),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",55)},
            onPurchase() {
                player.d.jm = player.d.jm.add(6)
            },
        },
        76: {
            title: "POWERRR",
            description: "+x20 joules gain",
            cost: new Decimal(1e6),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",55)},
            onPurchase() {
                player.d.jm = player.d.jm.add(20)
            },
        },
        91: {
            title: "Infected Power",
            description: "+x3 bacteria gain",
            cost: new Decimal(1e7),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",76)},
            onPurchase() {
                player.ba.bactmul = player.ba.bactmul.add(3)
            },
        },
        92: {
            title: "Infected Energy",
            description: "+x20 bacteria gain",
            cost: new Decimal(5e7),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",76)},
            onPurchase() {
                player.ba.bactmul = player.ba.bactmul.add(3)
            },
        },
        93: {
            title: "Infected Joules",
            description: "+x200 bacteria gain",
            cost: new Decimal(1e8),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",76)},
            onPurchase() {
                player.ba.bactmul = player.ba.bactmul.add(3)
            },
        },
        94: {
            title: "Powered Joules",
            description: "+x50 joules gain",
            cost: new Decimal(1.25e8),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",76)},
            onPurchase() {
                player.d.jm = player.d.jm.add(50)
            },
        },
        95: {
            title: "Energetical Joules",
            description: "+x500 joules gain",
            cost: new Decimal(2e8),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",76)},
            onPurchase() {
                player.d.jm = player.d.jm.add(50)
            },
        },
        96: {
            title: "Infected Pure Power",
            description: "Bacteria boosts pure power",
            cost: new Decimal(2e9),
            currencyDisplayName: "Joules",
            currencyInternalName: "jo",
            currencyLayer: "d",
            unlocked() {return hasUpgrade("d",76)},
            effect() {
                return player.ba.bact.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    buyables: {
       11: {
            title: "Rusty drills", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(1e3)
                let amt = getBuyableAmount("d", 11)
                let exp = amt.div(5)
                return init.pow(exp)
            },
            canAfford() { return player.d.db.gte(tmp[this.layer].buyables[this.id].cost) },
            display() { // Everything else displayed in the buyable button after the title
                return " Rusty drills boost energy gain\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Drill bits"
                
            },
        
            style: {
                "background": "linear-gradient(to left, gold, brown)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.d.rd = player.d.rd.add(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                player.d.db = player.d.db.sub(tmp[this.layer].buyables[this.id].cost)
                }
               
            },
            unlocked() {return hasUpgrade("d",11)}
        }, 
        12: {
            title: "Wooden drills", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(1e6)
                let amt = getBuyableAmount("d", 12)
                let exp = amt.div(12)
                return init.pow(exp)
            },
            canAfford() { return player.d.db.gte(tmp[this.layer].buyables[this.id].cost) },
            display() { // Everything else displayed in the buyable button after the title
                return " Wooden drills boost pure power gain\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Drill bits"
                
            },
        
            style: {
                "background": "linear-gradient(to right, brown, gray)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.d.wd = player.d.wd.add(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                player.d.db = player.d.db.sub(tmp[this.layer].buyables[this.id].cost)
                }
               
            },
            unlocked() {return hasUpgrade("d",24)}
        },
        13: {
            title: "Iron drills", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(1e7)
                let amt = getBuyableAmount("d", 13)
                let exp = amt.div(8)
                return init.pow(exp)
            },
            canAfford() { return player.d.db.gte(tmp[this.layer].buyables[this.id].cost) },
            display() { // Everything else displayed in the buyable button after the title
                return " Iron drills boost greenium gain\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Drill bits"
                
            },
        
            style: {
                "background": "linear-gradient(to right, white, gray)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.d.ird = player.d.ird.add(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                player.d.db = player.d.db.sub(tmp[this.layer].buyables[this.id].cost)
                }
               
            },
            unlocked() {return hasUpgrade("d",35)}
        },
        21: {
            title: "Stone drills", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(2e6)
                let amt = getBuyableAmount("d", 21)
                let exp = amt.div(10)
                return init.pow(exp)
            },
            canAfford() { return player.d.db.gte(tmp[this.layer].buyables[this.id].cost) },
            display() { // Everything else displayed in the buyable button after the title
                return " Stone drills boost energy gain\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Drill bits"
                
            },
        
            style: {
                "background": "linear-gradient(to left, gray, black)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.d.sd = player.d.sd.add(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                player.d.db = player.d.db.sub(tmp[this.layer].buyables[this.id].cost)
                }
               
            },
            unlocked() {return hasUpgrade("d",25)}
        },
        22: {
            title: "Gold drills", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(5e6)
                let amt = getBuyableAmount("d", 22)
                let exp = amt.div(7)
                return init.pow(exp)
            },
            canAfford() { return player.d.db.gte(tmp[this.layer].buyables[this.id].cost) },
            display() { // Everything else displayed in the buyable button after the title
                return " Gold drills boost drill bits gain\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Drill bits"
                
            },
        
            style: {
                "background": "linear-gradient(to right, gold, orange)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.d.gd = player.d.gd.add(1)
                if (tmp[this.layer].buyables[this.id].canAfford) {
                player.d.db = player.d.db.sub(tmp[this.layer].buyables[this.id].cost)
                }
               
            },
            unlocked() {return hasUpgrade("d",81)}
        }, 
        51: {
            title: "GAIN NEWTONS", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(2e6)
                let amt = getBuyableAmount("d", 51)
                let exp = amt.div(11)
                return init.pow(exp)
            },
            canAfford() { return player.d.db.gte(tmp[this.layer].buyables[this.id].cost) },
            display() { // Everything else displayed in the buyable button after the title
                x = tmp[this.layer].buyables[this.id].cost
                return " Reset for\n\ "
                + format(tmp[this.layer].buyables[this.id].cost/tmp[this.layer].buyables[this.id].cost*1.3) + " Newtons\n\
                Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Drill bits"
                
                
            },
        
            style: {
                "background": "radial-gradient(gold, orange)" ,
                width: "190px",
                height: "130px"
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (tmp[this.layer].buyables[this.id].canAfford) {
                player.d.db = player.d.db.sub(tmp[this.layer].buyables[this.id].cost)
                player.d.newton = player.d.newton.add(tmp[this.layer].buyables[this.id].cost/tmp[this.layer].buyables[this.id].cost*1.3)
                }
               
            },
            unlocked() {return hasUpgrade("d",55)}
        }, 
    }
}),
addLayer("o", {
    name: "oxygen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OXY", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        ot: new Decimal(100),
        ol: new Decimal(0.1),
        olmod: new Decimal(0.1)
    }},
    color: "#1A7C9E",
    requires: new Decimal(5e11), // Can be a function that takes requirement increases into account
    resource: "Oxygen Tanks", // Name of prestige currency
    baseResource: "Pure Power", // Name of resource prestige is based on
    baseAmount() {return player.ba.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for Oxygen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        if (hasUpgrade("ba",63)) return true
    },
    autoPrestige() { return (hasUpgrade("o", 22)) },
    update(diff) {
        if (player.o.points.gte(1) && !hasUpgrade("o",35)) player.o.ot = player.o.ot.sub(player.o.ol*diff)
        if (player.o.ot < 1) player.o.ot = new Decimal(0)
        if (player.o.ot < 1) player.points = new Decimal(0)
        if (hasUpgrade("o",35)) player.o.ol = new Decimal(100)
        
    },
    branches: ['ba'],
    resetsNothing() {return true},
    canBuyMax() {return hasUpgrade("o",15)},
    bars: {
    oxygentank: {
        fillStyle: {'background-color' : "#2D6BB1"},
        baseStyle: {'background-color' : "#000756"},
        textStyle: {'text-shadow': '0px 0px 2px #000000'},

        borderStyle() {return {'border-width': "4px"}},
        direction: UP,
        width: 60,
        height: 250,
        progress() {
            return player.o.ot.div(100)
        },
        display() {
            return formatWhole((player.o.ot.div(1)).min(100))
        },
        unlocked: true
    },
},
clickables: {
    11: {
        display() {return "RESET OXYGEN TANKS"},
        canClick() {if (player.o.points.gte(0)) return true},
        onClick() {return player.o.ot = new Decimal(100)}
        
    }
    
},
    tabFormat: {
        "IMPORTANT": {
            content: [
                ["infobox", "oxygeninfo"],
                "main-display",
                "prestige-button",
                "blank",
                ["bar", "oxygentank"], "blank",
                "clickables"
            ],
            
        },
        "OXYGEN UPGRADES": {
            content: [
                ["infobox", "oxygeninfo2"],
                "blank",
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15]]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25]]],
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]]]
                
            ],
            
        },
    },
    upgrades: {
        11: {
            title: "Tank repair",
            description: "Now that the tank has been repaired the oxygen wont run out quickly",
            cost: new Decimal(1),
            onPurchase() {
                player.o.ol = new Decimal(0.09)
            }
        },
        12: {
            title: "New Research",
            description: "Now we can explore and collect new samples. (Unlock new mars materials upgrades)",
            cost: new Decimal(2)
        },
        13: {
            title: "Oxygen Flow",
            description: "Oxygen flows through energy enhancing it (Oxygen boosts energy)",
            cost: new Decimal(10),
            effect() {
                return player.o.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Pure Oxygen Flow",
            description: "Oxygen flows through pure energy enhancing it (Oxygen boosts pure energy)",
            cost: new Decimal(35),
            effect() {
                return player.o.points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "SUPER TANK DELUXE",
            description: "This new tank can hold so much oxygen! (You can max buy oxygen)",
            cost: new Decimal(330)
        },
        21: {
            title: "Green flow",
            description: "Oxygen flows through greenium enhancing it (Oxygen boosts greenium)",
            cost: new Decimal(2500),
            unlocked() {return player.ev.points.gte(1e37) || hasUpgrade("ev",35)}
        },
        22: {
            title: "Auto Tanks",
            description: "Automate oxygen",
            cost: new Decimal(3000),
            unlocked() {return player.ev.points.gte(1e50) || hasUpgrade("ev",35)}
        },
        23: {
            title: "TANK-001SP",
            description: "oxygen boost points",
            cost: new Decimal(3700),
            unlocked() {return player.ev.points.gte(1e50) || hasUpgrade("ev",35)},
            effect() {
                return player.o.points.add(1).pow(0.6)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Mining Tanks",
            description: "+x2 drill bit gain",
            cost: new Decimal(3840),
            unlocked() {return player.ev.points.gte(1e50) || hasUpgrade("ev",35)},
            onPurchase() {
                player.d.dbm = player.d.dbm.add(2)
            }
        },
        25: {
            title: "Mining Tanks II",
            description: "+x4 drill bit gain",
            cost: new Decimal(3870),
            unlocked() {return player.ev.points.gte(1e50) || hasUpgrade("ev",35)},
            onPurchase() {
                player.d.dbm = player.d.dbm.add(4)
            }
        },
        31: {
            title: "Mining Tanks III",
            description: "+x6 drill bit gain",
            cost: new Decimal(4700),
            unlocked() {return player.ev.points.gte(1e60) || hasUpgrade("ev",35)},
            onPurchase() {
                player.d.dbm = player.d.dbm.add(6)
            }
        },
        32: {
            title: "Mining Tanks IV",
            description: "+x25 drill bit gain",
            cost: new Decimal(4900),
            unlocked() {return player.ev.points.gte(1e60) || hasUpgrade("ev",35)},
            onPurchase() {
                player.d.dbm = player.d.dbm.add(25)
            }
        },
        33: {
            title: "Mining Tanks V",
            description: "Drill bit/s is boosted",
            cost: new Decimal(5000),
            unlocked() {return player.ev.points.gte(1e60) || hasUpgrade("ev",35)},
            effect() {
                return player.d.points.add(1).pow(0.55)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        34: {
            title: "bajkldjfaklds",
            description: "nothing",
            cost: new Decimal(5001),
            unlocked() {return player.ev.points.gte(1e60) || hasUpgrade("ev",35)},
        },
        35: {
            title: "FILLED",
            description: "Oxygen tanks are always filled",
            cost: new Decimal(5040),
            unlocked() {return player.ev.points.gte(1e60) || hasUpgrade("ev",35)},
        }
    },
    infoboxes: {
        oxygeninfo: {
            title: "DOCUMENT 000000O1",
            titleStyle: {'color': '#2D6BB1'},
            body() { return "Your starting to run out of oxygen but there is no need to worry. When your oxygen runs out your energy production comes to a halt but you can refresh your oxygen tanks very easily but that will be a tedious task so its time to grow plants!" },
            bodyStyle: {'background-color': "#000756"}
            
            
        },
        oxygeninfo2: {
            title: "DOCUMENT 000000O2",
            titleStyle: {'color': '#2D6BB1'},
            body() { return "Well its gonna be too difficult to constantly refresh your oxygen tanks so with the new amounts of energy you harvested its time to make this easier." },
            bodyStyle: {'background-color': "#000756"}
            
            
        }
        
    },

}),
addLayer("ev", {
    name: "enviorment", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌲", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        green2: new Decimal(0),
        green3: new Decimal(0),
        green4: new Decimal(0),
        boosters: new Decimal(0),
        b1b: new Decimal(1),
        b2b: new Decimal(1),
        gboost: new Decimal(0)
    }},
    color: "#28A424",
    resource: "Greenium", // Name of prestige currency    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("ev",21)) mult = mult.times(upgradeEffect("ev",21))
        if (hasUpgrade("ev",32)) mult = mult.times(upgradeEffect("ev",32))
        if (hasUpgrade("ev",23)) mult = mult.times(5)
        if (hasUpgrade("ev",34)) mult = mult.times(10)
        if (player.ev.green4.gte(1)) mult = mult.times(player.ev.green4).div(2)
        if (player.d.ird.gte(1)) mult = mult.times(player.d.ird)
        if (player.ev.boosters.gte(1)) mult = mult.times(player.ev.boosters)
        if (hasUpgrade("ev",104)) mult = mult.times(player.ev.boosters).mul(5)
        if (hasUpgrade("ev",105)) mult = mult.times(player.ev.boosters).mul(3)
        if (hasUpgrade("o",21)) mult = mult.times(player.o.points).div(4)
        if (player.ev.gboost.gte(1))mult = mult.times(player.ev.gboost.mul(3))
        return mult
    },
    requires: new Decimal(1e120),
    baseResource: "Pure Power", // Name of resource prestige is based on
    baseAmount() {return player.ba.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.025, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade("ba",105))},
    onPrestige() {
        if(!hasMilestone("ev",2)) player.ba.points = player.ba.points = new Decimal(0)
        if(!hasMilestone("ev",2)) player.points = player.points = new Decimal(0)
    },
    hotkeys: [
        {key: "g", description: "G: Reset for Greenium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    update() {
        if (player.ev.green4 == 0) player.ev.green4 = player.ev.green4.add(1)
        setBuyableAmount('ev', 41, new Decimal(player.ev.boosters))
        setBuyableAmount('ev', 51, new Decimal(player.ev.gboost))
        if (player.ev.points.gte > 1e30) player.ev.points = player.ev.points.div(100)
        if (hasMilestone('ev',3)) {    
               if (layers.ev.buyables[41].canAfford()) {
                return layers.ev.buyables[41].buy()
               }    
        }
    },
    autoPrestige() { return (hasMilestone("ev", 0)) },
    resetsNothing() { return (hasMilestone("ev",2))},
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
            ],
            buttonStyle: {"border-color": "lime"},
        },
        "Greenium": {
            
            content: [
                ["microtabs","green"]
            ],
            buttonStyle: {"border-color": "green"},
        
        }
    },
    microtabs: {
        "green": {
            "Upgrades": {
                buttonStyle: {"border-color": "green"},
                content: [
                     ["display-text",
                        function() {return 'You have ' + format(player.ev.points) + ' Greenium'},
                        {"color": "green" , "font-size": "20px"}],
                        "blank",
                        ["display-text",
                            function() {return 'Greenium decay starts at 1e30 greenium'},
                            {"color": "green" , "font-size": "15px"}],
                            "blank",
                    ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15]]],
                    ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25]]],
                    ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34],["upgrade",35]]],
                    "blank",
                   
                ],
               
            },
            "Milestones": {
                buttonStyle: {"border-color": "green"},
                content: [
                    ["display-text",
                        function() {return 'You have ' + format(player.ev.points) + ' Greenium'},
                        {"color": "green" , "font-size": "20px"}],
                        "blank",
                   ["column",[["milestone",0],["milestone",1],["milestone",2],["milestone",3]]]
              
                ],
                unlocked() {return hasUpgrade("ev",14)}
            },
            "Isotopes": {
                buttonStyle: {
                    "border-color": "green"   
                },
                content: [
                    ["display-text",
                        function() {return 'You have ' + format(player.ev.green2) + ' Greenonium'},
                        {"color": "#599E45" , "font-size": "20px"}],
                    ["display-text",
                        function() {return 'You have ' + format(player.ev.green3) + ' Greeninite'},
                        {"color": "#91FF99" , "font-size": "20px"}],
                     ["display-text",
                        function() {return 'You have ' + format(player.ev.green4) + ' Greenilium'},
                        {"color": "#00B972" , "font-size": "20px"}],
                        "blank",
                        ["row",[["buyable",11],["buyable",12],["buyable",13]]]
              
                ],
                unlocked() {return hasMilestone("ev",1)}
            },
            "Boosters": {
                buttonStyle: {
                    "border-color": "cyan#54D4B1"   
                },
                content: [
                    ["display-text",
                        function() {return 'You have ' + format(player.ev.boosters) + ' Boosters' + '     Boosters boost greenium gain by: ' + format(player.ev.boosters) + 'x'},
                        {"color": "#54D4B1" , "font-size": "20px"}],
                        "blank",
                        ["row",[["buyable",41]]],
                        "blank",
                        ["row",[["upgrade",101],["upgrade",102],["upgrade",103],["upgrade",104],["upgrade",105]]],
                        "blank",
                        "blank",
                        ["display-text",
                        function() {return 'You have ' + format(player.ev.gboost) + ' Green boosters' + '     Green boosters boost greenium gain by: ' + format(player.ev.gboost.mul(3)) + 'x'},
                        {"color": "green" , "font-size": "20px"}],
                        "blank",
                        ["row",[["buyable",51]]],
                        
              
                ],
                unlocked() {return hasUpgrade("ev",25)}
            }
        }
    },
    buyables: {
        11: {
            title: "ISOTOPE: GREENONIUM", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(5e4)
                let amt = getBuyableAmount("ev", 11)
                let exp = amt.div(10)
                return init.pow(exp)
            },
            display() { // Everything else displayed in the buyable button after the title
                return " Greenonium boosts point gain\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Greenium"
                
            },
        
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            style: {
                "background": "radial-gradient(#194D33, #5BAD42)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ev.green2 = player.ev.green2.add(1)
               
            }
        },
        12: {
            title: "ISOTOPE: GREENINITE", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(1e5)
                let amt = getBuyableAmount("ev", 12)
                let exp = amt.div(9)
                return init.pow(exp)
            },
            display() { // Everything else displayed in the buyable button after the title
                return " Greeninite boosts pure power gain\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Greenium"
                
            },
        
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            style: {
                "background": "radial-gradient(#194D33, #4DFF5B)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ev.green3 = player.ev.green3.add(1)
               
            },
            unlocked() {return hasUpgrade("ev",22)}
        },
        13: {
            title: "ISOTOPE: GREENILIUM", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(5e5)
                let amt = getBuyableAmount("ev", 13)
                let exp = amt.div(5)
                return init.pow(exp)
            },
            display() { // Everything else displayed in the buyable button after the title
                return " Greenilium boosts greenium gain\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Greenium"
                
            },
        
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            style: {
                "background": "radial-gradient(#00B972, #7DFFCD)" ,
            },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ev.green4 = player.ev.green4.add(1)
               
            },
            unlocked() {return hasUpgrade("ev",24)}
        },
        41: {
            canAfford() {
                return player.ev.points.gte(tmp[this.layer].buyables[this.id].cost)},
            title: "Booster reset", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(2e6)
                let amt = getBuyableAmount("ev",41)
                let exp = amt.div(6)
                return init.pow(exp)
            },
            display() { // Everything else displayed in the buyable button after the title
                return " Reset greenium for a booster\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Greenium"
                
            },
        
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ev.boosters = player.ev.boosters.add(1)
                player.ev.points = player.ev.points = new Decimal(0)
               
            },
            style: {
                "background": "linear-gradient(to right, #5AFFEB, #30CDE0)" ,
                width: "235px",
                height: "130px"
            },
            unlocked() {return hasUpgrade("ev",25)}
        },
        51: {
            title: "Green booster reset", // Optional, displayed at the top in a larger font
            cost() {
                let init = new Decimal(1e30)
                let amt = getBuyableAmount("ev",51)
                let exp = amt.div(3)
                return init.pow(exp)
            },
            display() { // Everything else displayed in the buyable button after the title
                return " Reset greenium for a green booster (WARNING: RESETS BOOSTERS)\n\
                 Cost: "  + format(tmp[this.layer].buyables[this.id].cost)+ " Greenium"
                
            },
        
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.ev.gboost = player.ev.gboost.add(1)
                player.ev.points = player.ev.points = new Decimal(0)
                player.points = player.points = new Decimal(0)
                player.ba.points = player.ba.points = new Decimal(0)
                player.ev.boosters = player.ev.boosters = new Decimal(1)
               
            },
            style: {
                "background": "linear-gradient(to right, green, lime)" ,
                width: "235px",
                height: "130px"
            },
            unlocked() {return hasUpgrade("ev",33)}
        }
    },
    upgrades: {
        11: {
            title: "Exchange",
            description: "You lose oxygen quicker but you can start getting greenium benifits",
            cost: new Decimal(10),
            onPurchase() {
                player.o.ol = new Decimal(0.35)
            }
        },
        12: {
            title: "Exchange 2.0",
            description: "You lose more oxygen :)",
            cost: new Decimal(10),
            onPurchase() {
                player.o.ol = new Decimal(1.5)
            },
            unlocked() {return hasUpgrade("ev",11)}
        },
        13: {
            title: "Green energy",
            description: "Greenium boosts energy",
            cost: new Decimal(25),
            effect() {
                return player.ev.points.add(1).pow(0.5)
            },
            unlocked() {return hasUpgrade("ev",12)},
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
          
        },
        14: {
            title: "Green progress",
            description: "Unlock greenium milestones",
            cost: new Decimal(1),  
            unlocked() {return hasUpgrade("ev",12)},    
        },
        15: {
            title: "Pure green energy",
            description: "Greenim boosts pure power",
            cost: new Decimal(150),  
            unlocked() {return hasUpgrade("ev",12)}, 
            effect() {
                return player.ev.points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect   
        },
        21: {
            title: "Greener greenium",
            description: "Greenim boosts greenium",
            cost: new Decimal(300),  
            unlocked() {return hasUpgrade("ev",15)}, 
            effect() {
                return player.ev.points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect   
        },
        22: {
            title: "Greenyness",
            description: "Unlock a new isotope",
            cost: new Decimal(1e5),  
            unlocked() {return hasUpgrade("ev",15)}, 
        },
        23: {
            title: "Green boost",
            description: "x5 greenium gain",
            cost: new Decimal(1.5e5),  
            unlocked() {return hasUpgrade("ev",15)}, 
        },
        24: {
            title: "GREEN-200",
            description: "Unlock a new isotope",
            cost: new Decimal(1e6),  
            unlocked() {return hasUpgrade("ev",15)}, 
        },
        25: {
            title: "Green Boosters",
            description: "Unlock green boosters",
            cost: new Decimal(2e7),  
            unlocked() {return hasUpgrade("ev",15)}, 
        },
        31: {
            title: "Greensanity",
            description: "Greenium boosts points",
            cost: new Decimal(1e8),  
            unlocked() {return hasUpgrade("ev",103)},
            effect() {
                return player.ev.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect   
        },
        32: {
            title: "Green'd",
            description: "Greenium boosts greenium again",
            cost: new Decimal(6e8),  
            unlocked() {return hasUpgrade("ev",103)},
            effect() {
                return player.ev.points.add(1).pow(0.35)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect   
        },
        33: {
            title: "Greeny Greens",
            description: "Unlock Green boosters",
            cost: new Decimal(1e28),  
            unlocked() {return hasUpgrade("ev",103)},
        },
        34: {
            title: "Green 1.5",
            description: "x10 greenium",
            cost: new Decimal(1e40),  
            unlocked() {return hasUpgrade("ev",103)},
        },
        35: {
            title: "Mars Shards",
            description: "Unlock mars shards (new material)",
            cost: new Decimal(3e40),  
            unlocked() {return hasUpgrade("ev",103)},
        },
        101: {
            title: "BOOST I",
            description: "Boosters boost energy gain",
            cost: new Decimal(4),  
            currencyInternalName: "boosters",
            currencyDisplayName: "Boosters",
            currencyLayer: "ev",
            unlocked() {return hasUpgrade("ev",25)}, 
            style: {
                "background-color"() {

                    let color = "#03FFEB"
                    if (hasUpgrade("ev",101)) color = "#40B4DE"
                    return color
                    
                }
            },
        },
        102: {
            title: "BOOST II",
            description: "Boosters boost pure power gain",
            cost: new Decimal(6),  
            currencyInternalName: "boosters",
            currencyDisplayName: "Boosters",
            currencyLayer: "ev",
            unlocked() {return hasUpgrade("ev",25)}, 
            style: {
                "background-color"() {

                    let color = "#03FFEB"
                    if (hasUpgrade("ev",102)) color = "#40B4DE"
                    return color
                    
                }
            },
        },
        103: {
            title: "BOOST III",
            description: "Unlock more greenium upgrades",
            cost: new Decimal(8),  
            currencyInternalName: "boosters",
            currencyDisplayName: "Boosters",
            currencyLayer: "ev",
            unlocked() {return hasUpgrade("ev",25)}, 
            style: {
                "background-color"() {

                    let color = "#03FFEB"
                    if (hasUpgrade("ev",103)) color = "#40B4DE"
                    return color
                    
                }
            },
        },
        104: {
            title: "BOOST IV",
            description: "Boosters boost greenium",
            cost: new Decimal(18),  
            currencyInternalName: "boosters",
            currencyDisplayName: "Boosters",
            currencyLayer: "ev",
            unlocked() {return hasUpgrade("ev",25)}, 
            style: {
                "background-color"() {

                    let color = "#03FFEB"
                    if (hasUpgrade("ev",104)) color = "#40B4DE"
                    return color
                    
                }
            },
        },
        105: {
            title: "BOOST V",
            description: "Boosters boost greenium again sligtly",
            cost: new Decimal(25),  
            currencyInternalName: "boosters",
            currencyDisplayName: "Boosters",
            currencyLayer: "ev",
            unlocked() {return hasUpgrade("ev",25)}, 
            style: {
                "background-color"() {

                    let color = "#03FFEB"
                    if (hasUpgrade("ev",105)) color = "#40B4DE"
                    return color
                    
                }
            },
        },
        
    },
    clickables: {
    },
    milestones: {
        0: {
            requirementDescription: "50 greenium",
            effectDescription: "Auto prestige greenium",
            done() { return player.ev.points.gte(50) }
        },
        1: {
            requirementDescription: "10000 greenium",
            effectDescription: "Unlock Green Isotopes",
            done() { return player.ev.points.gte(10000) }
        },
        2: {
            requirementDescription: "5e4 greenium",
            effectDescription: "Greenium resets nothing",
            done() { return player.ev.points.gte(5e4) }
        },
        3: {
            requirementDescription: "1e37 greenium",
            effectDescription: "Automatically buy boosters",
            done() { return player.ev.points.gte(1e37) }
        }
    }
   
   

}),
addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🏆", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0)
    }},
    color: "#E9FF00",
    resource: "AP", // Name of prestige currency    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    update() {player.a.points = new Decimal(player.a.achievements.length)},

    layerShown(){return true},
    tabFormat: {
        "Main": {
            content: [
                ["infobox", "mars"],
                "blank",
                ["display-text",
                        function() {return 'You have ' + format(player.a.points) + ' Achievement Points'},
                        {"color": "yellow" , "font-size": "23px"}],
                "blank",
                "achievements",
                
            ],
            
        }
    },
    achievements: {
        11: {
            name: "Fresh Start",
            tooltip: "Get 1 point",
            done(){return player.points.gte(1)}
        },
        12: {
            name: "Energy Harvester",
            tooltip: "Get 10 pure power",
            done(){return player.ba.points.gte(10)}
        },
        13: {
            name: "Red Rocks",
            tooltip: "Get 1 Mars rock",
            done(){return player.ba.rocks.gte(1)}
        },
        14: {
            name: "Powerful!",
            tooltip: "Get 350 pure power",
            done(){return player.ba.points.gte(350)}
        },
        15: {
            name: "Sand. BUT MARS!",
            tooltip: "Get 1 Mars Sand",
            done(){return player.ba.sand.gte(1)}
        },
        16: {
            name: "Infected",
            tooltip: "Get 2 Bacteria samples",
            done(){return player.ba.bact.gte(2)}
        },
        17: {
            name: "Lots of rocks",
            tooltip: "Get 20 Mars Rocks",
            done(){return player.ba.rocks.gte(20)}
        },
        21: {
            name: "EVEN MORE???",
            tooltip: "Get 100 Mars Rocks",
            done(){return player.ba.rocks.gte(100)}
        },
        22: {
            name: "There's sand.. EVERYWHERE",
            tooltip: "Get 25 Mars Sand",
            done(){return player.ba.sand.gte(25)}
        },
        23: {
            name: "MORE BACTERIA",
            tooltip: "Get 15 Bacteria Samples",
            done(){return player.ba.bact.gte(15)}
        },
        24: {
            name: "Rock mania",
            tooltip: "Get 1e6 Mars Rocks",
            done(){return player.ba.rocks.gte(1e6)} 
        },
        25: {
            name: "Sand mania",
            tooltip: "Get 1e6 Mars sand",
            done(){return player.ba.sand.gte(1e6)} 
        },
        26: {
            name: "Viral infection",
            tooltip: "Get 2000 Bacteria samples",
            done(){return player.ba.bact.gte(2000)} 
        },
        27: {
            name: "AIR!",
            tooltip: "Get 1 Oxygen",
            done(){return player.o.points.gte(1)} 
        },
        31: {
            name: "Water",
            tooltip: "Get 5 water molecules",
            done(){return player.ba.water.gte(5)} 
        },
        32: {
            name: "Full tank",
            tooltip: "Get 30 oxygen",
            done(){return player.o.points.gte(30)} 
        },
        33: {
            name: "Many molecules",
            tooltip: "Get 500 water molecules",
            done(){return player.ba.water.gte(500)} 
        },
        34: {
            name: "Just dirt.",
            tooltip: "Get 5 Mars Dirt",
            done(){return player.ba.dirt.gte(5)} 
        },
        35: {
            name: "MULTIPLY",
            tooltip: "Get 1e6 bacteria",
            done(){return player.ba.bact.gte(1e6)} 
        },
        36: {
            name: "100 Tanks",
            tooltip: "Get 100 oxygen",
            done(){return player.o.points.gte(100)} 
        },
        37: {
            name: "Who's the real one?",
            tooltip: "Get 5 air",
            done(){return player.ba.air.gte(5)} 
        },
        41: {
            name: "Enhance!",
            tooltip: "Get 5 enhancement crystals",
            done(){return player.ba.en.gte(5)} 
        },
        42: {
            name: "Enhancements",
            tooltip: "Get 15 enhancement crystals",
            done(){return player.ba.en.gte(15)} 
        },
        43: {
            name: "Fresh air",
            tooltip: "Get 500 oxygen",
            done(){return player.o.points.gte(500)} 
        },
        44: {
            name: "NO MORE AIR",
            tooltip: "Get 1e12 air",
            done(){return player.ba.air.gte(1e12)} 
        },
        45: {
            name: "Challenging",
            tooltip: "Complete the challenge: energy",
            done(){return hasChallenge("ba",11)} 
        },
        46: {
            name: "Challenger",
            tooltip: "Complete the challenge: pure pain",
            done(){return hasChallenge("ba",12)} 
        },
        47: {
            name: "Greener is better",
            tooltip: "Get 5 greenium",
            done(){return player.ev.points.gte(5)} 
        },
        51: {
            name: "Greenioactive",
            tooltip: "Get 10 greenonium",
            done(){return player.ev.green2.gte(10)} 
        },
        52: {
            name: "Green ores",
            tooltip: "Get 10 greeninite",
            done(){return player.ev.green3.gte(10)} 
        },
        53: {
            name: "Green elements",
            tooltip: "Get 5 greenilium",
            done(){return player.ev.green4.gte(5)} 
        },
        54: {
            name: "Boosted",
            tooltip: "Get 5 boosters",
            done(){return player.ev.boosters.gte(5)} 
        },
        55: {
            name: "Into the greenyverse",
            tooltip: "Get 1 green booster",
            done(){return player.ev.gboost.gte(1)} 
        },
        56: {
            name: "Across the greenyverse",
            tooltip: "Get 4 green boosters",
            done(){return player.ev.gboost.gte(4)} 
        },
        57: {
            name: "To the core",
            tooltip: "Get 1 Drill",
            done(){return player.d.points.gte(1)} 
        },
        61: {
            name: "Rusty but still useful",
            tooltip: "Get 5 Rusty Drills",
            done(){return player.d.rd.gte(5)} 
        },
        62: {
            name: "Is wood better?",
            tooltip: "Get 1 Wooden drill",
            done(){return player.d.wd.gte(1)} 
        },
        63: {
            name: "At least it doesn't break",
            tooltip: "Get 5 stone drill",
            done(){return player.d.sd.gte(5)} 
        },
        64: {
            name: "Stronger drills",
            tooltip: "Get 1 iron drill",
            done(){return player.d.ird.gte(1)} 
        },
        65: {
            name: "Still not at china",
            tooltip: "Dig 10m",
            done(){return player.d.md.gte(10)} 
        },
        66: {
            name: "Just keep digging",
            tooltip: "Dig 5000m",
            done(){return player.d.md.gte(5000)} 
        },
        67: {
            name: "UNLIMITED POWER!!!",
            tooltip: "Get 1 Newton",
            done(){return player.d.newton.gte(1)} 
        }
    }
})
