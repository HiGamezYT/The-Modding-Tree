
addLayer("mb", {
    name: "Mars Base", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🧱", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        amps: new Decimal(0),
        watts: new Decimal(0),
        time: new Decimal(1),
        day: new Decimal(1),
        night: new Decimal(1),
        temperature: new Decimal(0),
        temperatureTime: new Decimal(0), 
        joules: new Decimal(0)
    }},
    color: "#b5894aff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "volts", // Name of prestige currency
    baseResource: "energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
update(diff) {
    player.mb.watts = player.mb.points.times(player.mb.amps)
    player.mb.joules = player.mb.joules.plus(player.mb.watts.times(diff))
    player.mb.time = player.mb.time.plus(diff);
    const PERIOD = 500;
    const MIN_TEMPA = -80;
    const MAX_TEMPA = 45;
    const cycleTime = player.mb.time.toNumber() % PERIOD;
    const cycleProgress = cycleTime / PERIOD;
    const normalized = Math.sin(cycleProgress * 2 * Math.PI - Math.PI / 2) * 0.5 + 0.5; //sine wave
    const temp = MIN_TEMPA + normalized * (MAX_TEMPA - MIN_TEMPA);
    player.mb.temperature = new Decimal(temp);
    let isDay = normalized >= 0.5;
    if (typeof player.mb.isDay !== "boolean") player.mb.isDay = !isDay;
    if (!player.mb.isDay && isDay) {
        player.mb.day = player.mb.day.plus(1);
    }
    player.mb.isDay = isDay;
    player.mb.night = isDay ? new Decimal(0) : new Decimal(1);
},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "v", description: "V: Reset for volts", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Electricity Production",
            description: "Begin to produce joules to power your machinery. (Start off with 1 amp)",
            cost: new Decimal(1),
            onPurchase() {
                player.mb.amps = new Decimal(1)
            }
        },
        12: {
            title: "Voltage",
            description: "The amount of voltages will boost the amount of energy you get.",
            cost: new Decimal(25),
            currencyDisplayName: "Joules",
            currencyInternalName: "joules",
            currencyLayer: "mb",
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "More Amps",
            description: "1.0 Amps -> 1.25 Amps",
            cost: new Decimal(70),
            currencyDisplayName: "Joules",
            currencyInternalName: "joules",
            currencyLayer: "mb",
             onPurchase() {
                player.mb.amps = new Decimal(1.25)
            }
        },
        14: {
            title: "Efficient Energy",
            description: "The amount of watts you have boosts the amount of energy you get.",
            cost: new Decimal(100),
            currencyDisplayName: "Joules",
            currencyInternalName: "joules",
            currencyLayer: "mb",
              effect() {
                return player[this.layer].watts.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        
        },
        15: {
            title: "More Amps II",
            description: "1.25 Amps -> 1.5 Amps",
            cost: new Decimal(250),
            currencyDisplayName: "Joules",
            currencyInternalName: "joules",
            currencyLayer: "mb",
             onPurchase() {
                player.mb.amps = new Decimal(1.5)
            }
        },
        21: {
            title: "Energy Efficiency I",
            description: "Double the amount of energy you generate",
            cost: new Decimal(300),
            currencyDisplayName: "Joules",
            currencyInternalName: "joules",
            currencyLayer: "mb",
            unlocked() {
                return hasUpgrade('mb',15)
            }
        },
        22: {
            title: "Energy Efficiency II",
            description: "Triple the amount of energy you generate",
            cost: new Decimal(300),
            currencyDisplayName: "Joules",
            currencyInternalName: "joules",
            currencyLayer: "mb",
            unlocked() {
                return hasUpgrade('mb',15)
            }
        },
        23: {
            title: "Outside of the base",
            description: "You must activate all the solar panels on your mars base for maximum efficiency.",
            cost: new Decimal(8),

            unlocked() {
                return hasUpgrade('mb',15)
            }
        },
        24: {
            title: "Energy Efficiency III",
            description: "The amount of amps you have boosts energy.",
            cost: new Decimal(1000),
            currencyDisplayName: "Joules",
            currencyInternalName: "joules",
            currencyLayer: "mb",
            unlocked() {
                return hasUpgrade('mb',15)
            },
              effect() {
                return player[this.layer].amps.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25: {
            title: "Researching",
            description: "Unlock the research tree",
            cost: new Decimal(1500),
            currencyDisplayName: "Joules",
            currencyInternalName: "joules",
            currencyLayer: "mb",
            unlocked() {
                return hasUpgrade('mb',15)
            }
        }
    },
    achievements: {
        11: {
            name: "Electricity",
            tooltip: "Obtain 10 Joules",
            done() { return player.mb.joules.gte(10) },
            unlocked() {return true},
        },
        12: {
            name: "Low Voltage",
            tooltip: "Obtain 5 Voltages",
            done() { return player.mb.points.gte(5) },
            unlocked() {return true},
        }
    },
    bars: {
    temperature: {
        direction: RIGHT,
        width: 600,
        height: 30,
        progress() {
            const MIN_TEMPA = new Decimal(-80);
            const MAX_TEMPA = new Decimal(45);
            let tempa = player.mb.temperature;
            if (tempa.lt(MIN_TEMPA)) tempa = MIN_TEMPA;
            if (tempa.gt(MAX_TEMPA)) tempa = MAX_TEMPA;
            return tempa.minus(MIN_TEMPA).div(MAX_TEMPA.minus(MIN_TEMPA));
        },
        display() {
  const temp = player.mb.temperature.toFixed(2); 
  return `<span style="color: #a34d4dff; font-weight: bold; font-size: 20px;">
            Temperature: ${temp} °C
          </span>`;
},
        fillStyle() {
    return { backgroundColor: "#ff6600" }; 
  },
  borderStyle() {
    return { borderColor: "#000000ff", borderWidth: "2px", borderStyle: "solid" };  
  }
    },
},

    tabFormat: {
        "BASE INFORMATION": {
            content: [
                ["raw-html", function () {
                    let dis = `
            <div style="
            color: #654200ff;
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
            line-height: 0.86;
            max-width: 600px;
            ">
             🚀 <strong>YOUR MISSION:</strong><br>
    You've been deployed to Mars to terraform the surface.<br>
    Start by producing energy to power machinery.<br>
    Don't worry about oyxgen as there is enough to sustain you for a while<br>
    <i>(A day lasts exactly 500 seconds)</i><br>
    <i>(Additional information: During the nights energy production will slow down, but begin to ramp up when the temperature rises)</i>
                 </div>
                    `;
                    return dis;
                }],

               ["raw-html", function () {  
    let isNight = player.mb.night.eq(1);
    let timeText = isNight ? "🌙 Night" : "☀️ Day"; //ifelse stuff
    let timeColor = isNight ? "#5a7dff" : "#ffcc33";
    let dis = `
        <span style="color: #cdb961ff;">
            You have been here for: ${format(player.mb.day)} days.
        </span><br>
        <span style="color: ${timeColor}; font-weight: bold;">
            The time is currently: ${timeText}
        </span>
    `;
    return dis;
}],
["raw-html", function() {
                    let dis = '<span style="color: #ff6600ff; font-size: 24px;">TEMPERATURE:</span>'
                    return dis
                }], 
["bar",'temperature']
            ],
         
        },
        "ACHIEVEMENTS": {
            content: [
                "achievements"
            ]
         
        },
        "MAIN GENERATOR": {
            content: [
                "main-display",
                "prestige-button",
                ["raw-html", function() {
                    let dis = '<span style="color: #ffd000ff;">You have '+ format(player.points)+' Energy.'
                    return dis
                }],
                ["raw-html", function() {
                    let dis = '<span style="color: #ca7c16ff;">You have '+ format(player.mb.amps)+' Amps.'
                    return dis
                }],
                ["raw-html", function() {
                    let dis = '<span style="color: #007382ff;">You have '+ format(player.mb.watts)+' Watts.'
                    return dis
                }],
                ["raw-html", function() {
                    let dis = '<span style="color: #fffa64ff;">You have '+ format(player.mb.joules)+' Joules.'
                    return dis
                }],
                ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15]]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25]]]
            ]
            
        }
    }
}),
addLayer("o", {
    name: "Outside", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⚙️", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        solarstat: new Decimal(0),
        solartime: new Decimal(0),
        js: new Decimal(0),
        jsg: new Decimal(5),
        c: new Decimal(500),
        duration: new Decimal(10)
    }},
    color: "#6fc97aff",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "research points", // Name of prestige currency
    baseResource: "energy", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
         if (hasUpgrade('o', 33)) mult = mult.times(upgradeEffect('o', 33))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('mb',23)},
    branches: ["mb"],
    update(diff) {
    if (hasUpgrade('o',33)) {player.o.points = player.o.points.plus(new Decimal(Math.log(player.mb.points.div(2))).times(diff))}
    if (player.o.solarstat.eq(1) && player.mb.night.eq(0)) {
        if (player.o.solartime.gt(0)) {
            player.o.js = new Decimal(player.o.jsg);
            player.mb.joules = player.mb.joules.plus(player.o.js.times(diff));
            player.o.solartime = player.o.solartime.minus(diff);
        } else {
            // Time ran out, stop generation
            player.o.solartime = new Decimal(0);
            player.o.solarstat = new Decimal(0); 
            player.o.js = new Decimal(0);
        }
    } else {
        player.o.js = new Decimal(0); 
    }
    if (player.mb.night.eq(1)) {
          player.o.solartime = new Decimal(0);
        player.o.solarstat = new Decimal(0); 
    }
},
    clickables: {
        11: {
         display() {
    let isOn = player.o.solarstat.eq(1);
    let square = isOn ? "🟦" : "⬛";
    let panel = `${square.repeat(4)}\n`.repeat(5).trim();
    return `<div style="font-size: 20px; font-family: monospace; white-space: pre; line-height: 1;">${panel}</div>`;
},
            tooltip() {   let isOn = player.o.solarstat.eq(1);
            let status = isOn ? "ON" : "OFF";
            let joules = format(player.o.js); 
            let cost = format(player.o.c)
            let time = format(player.o.solartime)
            return `STATUS: ${status}.<br>Generating: ${joules} joules/s. Cost to start-up solar panel: ${cost} joules. Time left: ${time}`;},
            style() {
                 let isOn = player.o.solarstat.eq(1);
            return {
                "background-color": isOn ? "#3366ff" : "#111111",
                "border": `2px solid ${isOn ? "#1a3d7c" : "#333333"}`,
                "border-radius": "8px",
                "padding": "4px",
                "margin": "2px",
                "color": "#ffffff"
            };
            },
              canClick() {
            return true;
        },
        onClick() {
    if (player.o.solarstat.eq(0) && player.mb.joules.gte(player.o.c) && player.mb.night.eq(0)) {
        player.mb.joules = player.mb.joules.minus(player.o.c);
        player.o.solarstat = new Decimal(1);
        player.o.solartime = new Decimal(player.o.duration);
    }
}
    },
},

    tabFormat: {
        "OUTSIDE BASE INFORMATION": {
            content: [
                  ["raw-html", function () {
                    let dis = `
            <div style="
            color: #9f875bff;
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
            line-height: 0.86;
            max-width: 600px;
            ">
             💡 <strong>OBJECTIVE:</strong><br>
    Now that you have the inside of your base up and running,<br>
    your next goal is to get the solar panels to work and then eventually get more efficient ways to generate energy<br>
                 </div>
                    `;
                    return dis;
                }],
            ]
        },
        "ACHIEVEMENTS": {
            content: [
                "achievements"
            ]
        },
        "SOLAR PANELS": {
            content: [
                  ["raw-html", function() {
                    let dis = 'Once solar panels are activated they will eventaully deactivate. If they deactivate you can reactivate them by using joules. <br><i>(The solar panels do not function at night.)</i>'
                    return dis
                }],
                ["row",[["clickable",11]]]
            ]
        },
        "RESEARCH TREE": {
            content: [
                "main-display",
                ["raw-html", function() {
                    let dis = 'You are currently generating ' + format(Math.log10(player.mb.points.div(2))) + ' <span style="color: #008830ff;">Research Points/s </span> <i>You generate research points based on how many volts you have: <span style="color: #b50000ff;">log(volts/2)</span>'
                    let dis2 = 'You are currently generating ' + format(Math.log10(player.mb.points.div(2))*upgradeEffect('o',33)) + ' <span style="color: #008830ff;">Research Points/s </span> <i>You generate research points based on how many volts you have: <span style="color: #b50000ff;">log(volts/2)</span>'
                    if (hasUpgrade('o',33)) {
                        return dis2
                    } else {
                        return dis
                    }
                }],
                //format(Math.log10(player.mb.points.div(2))*upgradeEffect('o',33))
                ["row",[["upgrade",11]]],
                ["row",[["upgrade",21],["upgrade",22]]],
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34]]]
            ]
        }
    },
    upgrades: {
        11: {
            title: "Low Maintenance",
            description: "Cost for the startup: 500 -> 400 <i>(Who uses these solar panels anyway?)</i>",
            cost: new Decimal(50),
            onPurchase() {
                player.o.c = new Decimal(400)
            }
        },
        21: {
            title: "Low Maintenance II",
            description: "Cost for the startup: 400 -> 300",
            cost: new Decimal(50),
            onPurchase() {
                player.o.c = new Decimal(300)
            },
            unlocked() {return hasUpgrade('o',11)},
            branches: [11]
        },
         22: {
            title: "Longer Duration",
            description: "Duration of the solar panel: 10 -> 15",
            cost: new Decimal(50),
            onPurchase() {
                player.o.duration = new Decimal(15)
            },
              unlocked() {return hasUpgrade('o',11)},
            branches: [11]
        },
        31: {
            title: "Longer Duration II",
            description: "Duration of the solar panel: 15 -> 20",
            cost: new Decimal(500),
            onPurchase() {
                player.o.duration = new Decimal(20)
            },
            branches: [22],
            unlocked() {return hasUpgrade('o',21) || hasUpgrade('o',22)},
        },
        32: {
            title: "Work Smarter Not Harder",
            description: "Research Points boost the amonut of energy you get",
            cost: new Decimal(75),
            onPurchase() {
                player.o.duration = new Decimal(20)
            },
            unlocked() {return hasUpgrade('o',21) || hasUpgrade('o',22)},
            effect() {
                return player[this.layer].points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [22]
        },
        33: {
            title: "Intelligence I",
            description: "Volts boosts research points",
            cost: new Decimal(75),
            onPurchase() {
                player.o.duration = new Decimal(20)
            },
            unlocked() {return hasUpgrade('o',21) || hasUpgrade('o',22)},
            effect() {
                return player.mb.points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            branches: [22]
        }
    },
    achievements: {
        11: {
            name: "Researching",
            tooltip: "Have 100 Reserach Points",
            done() { return player.o.points.gte(100) },
            unlocked() {return true},
        },
    }
}),
addLayer("a", {
    name: "Achievements",
    symbol: "🏅",
    position: 0,
    startData() { return { 
        unlocked: true, 
        points: new Decimal(0) 
    }},
    color: "#cdb900",
    requires: new Decimal(0),
    resource: "Achievement Points",
    type: "none",
    row: "side",
    layerShown() { return true },
    achievements: {
        11: {
            name: "The Beginning",
            tooltip: "Begin your journey. Reward: 1 AP.",
            done() { return hasUpgrade('mb',11) },
            unlocked() {return true},
            onComplete() { addPoints("a", 1) }
        },
        12: {
            name: "The Outside",
            tooltip: "Unlock the outside of the base. Reward: 1 AP.",
            done() { return hasUpgrade('mb',23) },
            unlocked() {return true},
            onComplete() { addPoints("a", 1) }
        },
        13: {
            name: "Solar Panels",
            tooltip: "Activate your first solar panel Reward: 1 AP.",
            done() { return player.o.solarstat.gte(1)},
            unlocked() {return true},
            onComplete() { addPoints("a", 1) }
        },
        14: {
            name: "Scientific Research",
            tooltip: "Unlock the research tree Reward: 1 AP.",
            done() { return hasUpgrade('mb',25)},
            unlocked() {return true},
            onComplete() { addPoints("a", 1) }
        }
    },
    tabFormat: {
        "Achievements": {
            content: [
                "main-display", "achievements"
            ]
        }
    }
})