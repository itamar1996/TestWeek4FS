import exp, { Request, Response, Router } from 'express'
import { BefferService } from '../services/beeferSerice'
import Beefer from '../models/beefer'
import { personService } from '../services/personService'
const router:Router = exp.Router()

router.post('/', async (
    req:Request,
    res:Response
):Promise<void> => {
    try {
        const {name}  = req.body
        const result = await personService.createNewPerson(name)              
        if(!result)
        {
            res.status(400).json({
                err: true,
                message: 'person name missing',
                data: null
            })
        }
        res.status(200).json({
            err: false,
            message: 'person created',
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'beefer not created',
            data: null
        })
    }
})
router.put('/:id', async (
    req:Request,
    res:Response
):Promise<void> => {
    try {
        const personid  = req.params.id;
        const {beeferId} = req.body
        const result = await personService.updatePerson(Number(personid),Number(beeferId))              
        if(!result)
        {
            res.status(400).json({
                err: true,
                message: 'person not found',
                data: null
            })
        }
        res.status(200).json({
            err: false,
            message: 'person update',
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'beefer not created',
            data: null
        })
    }
})

export default router