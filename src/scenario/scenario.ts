import {
    createUserScenario,
    createSystemScenario,
    createSaluteRequest,
    createSaluteResponse,
    createScenarioWalker,
    createMatchers,
    SaluteRequest,
    NLPRequest,
    NLPResponse,
    createIntents,
} from '@salutejs/scenario';
import handlePause from '../App.js';
import handleStart from '../App.js';
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory';
import { runAppHandler, noMatchHandler, closeAppHander, stop_train, continue_train, done_train } from './handlers.js';


const { regexp, action, text } = createMatchers<SaluteRequest>();

const userScenario = createUserScenario({

    stop_train:{
        match: regexp(/^Пристанови$/i),
        handlePause,
        handle: stop_train
    },

    continue_train:{
        match: regexp(/^Продолжи$/i),
        handleStart,
        handle: continue_train
    },

    done_train:{
        match: regexp(/^Заверши$/i),
        handle: done_train
    },

});

const scenarioWalker = createScenarioWalker({
    systemScenario: createSystemScenario({
        RUN_APP: runAppHandler, // done
        NO_MATCH: noMatchHandler, // done
        CLOSE_APP: closeAppHander // done
    }),
    // recognizer: new SmartAppBrainRecognizer("9d144a19-7945-43c6-b79e-3f4f7f028a58"),
    userScenario,
});


const storage = new SaluteMemoryStorage();

export const handleNlpRequest = async (request: NLPRequest): Promise<NLPResponse> => {
    const req = createSaluteRequest(request);
    const res = createSaluteResponse(request);

    console.log(req.request);
    const sessionId = request.uuid.userId;
    const session = await storage.resolve(sessionId);

    await scenarioWalker({ req, res, session });
    await storage.save({ id: sessionId, session });
    return res.message;
};