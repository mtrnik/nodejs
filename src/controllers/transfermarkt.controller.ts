import {Request, Response} from "express";
import got from "got-cjs";
import * as cheerio from 'cheerio';

export class TransfermarktController {

    async match(req: Request<{id: string}>, res: Response) {
        const matchId = req.params.id

        const page = await got.get('https://www.transfermarkt.com/spielbericht/index/spielbericht/' + matchId)
        const $ = cheerio.load(page.body, null, false);

        console.debug($('.sb-team.sb-heim .sb-vereinslink').text())
        console.debug($('.sb-team.sb-gast .sb-vereinslink').text())

        const players = $('.aufstellung-spieler-container .aufstellung-rueckennummer-name a').get()
        console.debug('player', players.map(player => $(player).text()))

        res.send(page.body)
    }
}