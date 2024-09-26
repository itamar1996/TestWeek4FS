import exp, { Request, Response, Router } from 'express'
import { BefferService } from '../services/beeferSerice'
import Beefer from '../models/beefer'
import Status from '../models/statusEnum'

const router:Router = exp.Router()

router.post('/', async (
    req:Request,
    res:Response
):Promise<void> => {
    try {
        const {name}  = req.body
        const result = await BefferService.createNewBeefer(name)              
        if(!result)
        {
            res.status(400).json({
                err: true,
                message: 'beefer name missing',
                data: null
            })
        }
        res.status(200).json({
            err: false,
            message: 'beefer created',
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'beefer not created',
            data: null
        })
    }
})
router.get('/', async (
    req:Request,
    res:Response
):Promise<void> => {
    try {
        const beefers :Beefer[] = await BefferService.getAllBeefers()
        let mymessage = "sucses";
        if(beefers.length == 0)
        {
            mymessage = "you dont have beefers";
        }
        res.status(200).json({
            err: false,
            message:mymessage,
            data: beefers
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        })
    }
})
router.get('/:id', async (
    req:Request,
    res:Response
):Promise<void> => {
    try {
        let beefer = await BefferService.getBeeferById(Number(req.params.id))
        let mymessage = "sucses";
        if(!beefer)
        {
            mymessage = "beefer not found";
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: beefer
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        })
    }
})
router.get('/status/:status', async (
    req:Request,
    res:Response
):Promise<void> => {
    try {
        const beefers =await BefferService.getBeeferByStatus(req.params.status)
        let mymessage = "sucses";
        if(beefers.length == 0)
        {
            mymessage = "you dont have beefers machig to status";
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: beefers
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        })
    }
})
router.delete('/:id', async (
    req:Request,
    res:Response
):Promise<void> => {
    try {
        const result  = await BefferService.deleteBeefer(Number( req.params.id))
        let mymessage = "sucses delete";
        if(!result)
        {
            mymessage = "beefer not found";
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: result
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        })
    }
})
router.put('/:id/status', async (
    req:Request,
    res:Response
):Promise<void> => {
    try {
        const {status} = req.body
        let result;
        let mymessage = "sucses update";
        if(status == Status.deployed)
        {
            const LON = req.body["LON"]
            const LAT = req.body["LAT"]
            if(!LAT || !LON)
            {
                res.status(400).json({
                    err: true,
                    message: 'missing lon or lat',
                    data: null
                })
                return
            }
            result = await      BefferService.explosionBeeferUpdate(Number(req.params.id),LON,LAT)
        }
        else{
            result = await
        BefferService.updateBeeferStatus(Number(req.params.id),status)
        }
        console.log(result);
        
        if(!result){
            mymessage = "not found beefer"
        }
        res.status(200).json({
            err: false,
            message: mymessage,
            data: result
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: 'I was way too lazy to change the default message',
            data: null
        })
    }
})


export default router