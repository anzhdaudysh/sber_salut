import { SaluteHandler, SaluteRequest } from '@salutejs/scenario';

export const runAppHandler: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    req.character === 'joy' ?
        res.setPronounceText("Приветствую вас. Скажите, какую тренировку вы бы хотели начать.") :
        res.setPronounceText("Здравствуйте! Как бы вы сегодня хотели размяться.")
    res.appendSuggestions(['кроссфит', 'стречинг', 'медитация', 'кардио'])
    res.setEmotion('radost')
};
 
export const noMatchHandler: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    res.appendCommand({ type: 'HELP' })
    res.setEmotion('zainteresovannost')
};

export const closeAppHander: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    res.setPronounceText("Всего хорошего")
};

export const stop_train: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    res.appendCommand({ type: 'STOP' })
    req.character === 'joy' ?
        res.setPronounceText("Скажите, мне когда вы захотите продолжить.") :
        res.setPronounceText("Скажите, когда продолжить.")
    res.appendSuggestions(['Продолжи'])
};

export const continue_train: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    res.appendCommand({ type: 'CONTINUE' })
    req.character === 'joy' ?
        res.setPronounceText("Скажите, если вам нужен перерыв или закончить.") :
        res.setPronounceText("Вы можете остановить или закончить в любой момент.")
    res.appendSuggestions(['Приостонови', 'Закончи'])
};

export const done_train: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    res.appendCommand({ type: 'DONE' })
    req.character === 'joy' ?
        res.setPronounceText("Сегодня вы приблизились на шаг к своей цели!") :
        res.setPronounceText("Вы заряжены на продуктивный день!")
    res.appendSuggestions(['Закончи'])
};


// export const restart: SaluteHandler<SaluteRequest> = ({ req, res }) => {
//     res.appendCommand({ type: 'RESET' })
//     req.character === 'joy' ?
//         res.setPronounceText("Скажи, на какое время установить таймер. Например, поставь одну минуту или одна минута") :
//         res.setPronounceText("Скажите, на какое время установить таймер. Например, поставь одну минуту или одна минута")
//     res.appendSuggestions(['Поставь 2 часа', '1 час 30 минут'])

// };

// export const setTime: SaluteHandler<SaluteRequest> = ({ req, res }) => {
//     const { hours, minutes, seconds } = req.variables
//     const s: number =
//         (hours !== undefined ? Number(hours) * 60 * 60 : 0) +
//         (minutes !== undefined ? Number(minutes) * 60 : 0) +
//         (seconds !== undefined ? Number(seconds) : 0);
//     if (s === 0) {
//         res.setPronounceText('Поставить все параметры таймера на 0 не получится');
//     }
//     else {
//         res.appendCommand({ type: 'SETTIME', time: s })
//     }
// };

// export const move: SaluteHandler<SaluteRequest> = ({ req, res }) => {
//     res.appendCommand({ type: "MOVE" })
// };

// export const help: SaluteHandler<SaluteRequest> = ({ req, res }) => {
//     const { screen } = req.variables;
//     if (screen === 'Start') {
//         req.character === 'joy' ?
//             res.setPronounceText('Скажи время, которое хочешь установить на таймере. Например, поставь одну минуту или одна минута') :
//             res.setPronounceText('Скажите время, которое хотите установить на таймере. Например, поставь одну минуту или одна минута')
//     } else if (screen === 'Middle') {
//         req.character === 'joy' ?
//             res.setPronounceText('Для начала игры нужно сказать начинают белые или черные. Дальше по игре ты можешь сказать сходил или готово, когда совершишь ход. Также ты можешь сказать заново для установки нового времени') :
//             res.setPronounceText('Для начала игры нужно сказать начинают белые или черные. Дальше по игре вы можете сказать сходил или готово, когда совершите ход. Также вы можете сказать заново для установки нового времени')
//     } else {
//         req.character === 'joy' ?
//             res.setPronounceText('Скажи, заново если ты хочешь начать игру сначала') :
//             res.setPronounceText('Скажите, заново если вы хотите начать игру сначала')
//     }
// };

// export const preHelp: SaluteHandler<SaluteRequest> = ({ req, res }) => {
//     res.appendCommand({ type: 'HELP' })
// };

// export const result: SaluteHandler<SaluteRequest> = ({ req, res }) => {
//     const { winner } = req.variables;
//     res.setPronounceText(`${winner}`)
// };

// export const chooseStart: SaluteHandler<SaluteRequest> = ({ req, res }) => {
//     const { side } = req.variables;
//     var start = side === 'белый' ? 'top' : 'bottom';
//     res.appendCommand({ type: "START", timer: start });
// };




