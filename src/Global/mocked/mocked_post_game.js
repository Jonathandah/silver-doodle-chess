const moment = require("moment")
import { user$ } from "../store/userStore"

module.exports = {
    header: {
        Black: null,
        White: null,
        Date: moment().format('YYYY-MM-DD')
    },
    board: "r1bqk2r/pppp1ppp/2P5/8/1b6/1Q3pP1/PP1PPP1P/R1B1KB1R b KQkq - 1 8",
    owner: user$.value
}