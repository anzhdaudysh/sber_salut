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
import {handlePause, handleStart} from '../App.js';
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory';
import { runAppHandler, noMatchHandler, closeAppHander, stop_train, continue_train, done_train } from './handlers';


const { regexp, action, text } = createMatchers<SaluteRequest>();

const userScenario = createUserScenario({
    stop_train:{
        match: regexp(/^Пристанови$/i),
        handlePause(),
        handle: stop_train
    },

    continue_train:{
        match: regexp(/^Продолжи$/i),
        handle: continue_train
    },

    done_train:{
        match: regexp(/^Заверши$/i),
        handle: done_train
    },

    // restart: {
    //     match: regexp(/^Заново$/i),
    //     handle: restart,
    // },

    // setTime: {
    //     match: regexp(/^Поставить(?: (?<hours>\d+) час)?(?: (?<minutes>\d+) минут.)?(?: (?<seconds>\d+) секунд.)?$/i, { normalized: true }),
    //     handle: setTime,
    // },

    // setAnotherTime: {
    //     match: regexp(/^(?:(?<hours>\d+) час(?:\s|$))?(?:(?<minutes>\d+) минут.(?:\s|$))?(?:(?<seconds>\d+) секунд.?(?:\s|$))?$/i, { normalized: true }),
    //     handle: setTime,
    // },

    // move: {
    //     match: regexp(/^(Сходить|Готовый)$/i),
    //     handle: move,
    // },

    // chooseStart: {
    //     match: regexp(/^(?:Начинать\s+)?(?<side>белый|черный)$/i, { normalized: true }),
    //     handle: chooseStart,
    // },

    // help: {
    //     match: regexp(/^Помощь$/i),
    //     handle: preHelp,
    // },
    // help_button: {
    //     match: action('help'),
    //     handle: help
    // },

    // result: {
    //     match: action('result'),
    //     handle: result
    // },

    // button_restart: {
    //     match: action('restart'),
    //     handle: restart,
    // }

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