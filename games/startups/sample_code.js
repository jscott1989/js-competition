function sum_object(o) {
	var total = 0;
	for (var i in o) {
		total += o[i];
	}
	return total;
}

function take_turn(me) {
	function trade_for(requirements) {
		request = {}
		offer = {}

		for (var resource in RESOURCES) {
			if (resource in requirements && requirements[resource] > me.resources[resource]) {
				request[resource] = requirements[resource] - me.resources[resource];
			} else {
				to_offer = game.resources[resource] - requirements[resource];
				if to_offer > 0 {
					offer[resource] = to_offer
				}
			}
		}

		return trade(offer, request);
	}

	var traded = false;

	if (sum_object(me.generators) < MAX_RESOURCE_GENERATORS) {
		traded = trade_for(GENERATOR_COST)
	}

	if (!traded && sum_object(me.improved_generators) < MAX_IMPROVED_RESOURCE_GENERATORS) {
		traded = trade_for(GENERATOR_IMPROVEMENT_COST)
	}

	if (!traded) {
		trade_for(PR_COST)
	}

	while (can_purchase_generator()) {
		var generator_type = purchase_generator()
		console.log("Purchased " + generator_type);
	}

	while (can_upgrade_generator()) {
		var generator_type = upgrade_generator()
		console.log("Upgraded " + generator_type);
	}

	while (game.can_purchase_pr()) {
		purchase_pr()
		print "Purchased PR"
	}
}

/**
 * There is an incoming trade.
 *
 * player_id is the ID of the player offering the trade
 * offering is an Object, where the key is the type of resource being offered, and the value is the number of that resource being offered
 * requesting is an Object, where the key is the type of resource being requested, and the value is the number of that resource being requested
 *
 * Return True to accept, or False to reject
 */
function incoming_trade(me, player_id, offering, requesting) {
	if sum_object(offering) >= sum_object(requesting) {
		return true
	}
	return false;
}