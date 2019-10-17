const PHYSICS_EQUATIONS = [
    {
        result: 'd',
        inputs: ['a', 't'],
        equation: (a, t) => 0.5 * a * Math.pow(t, 2),
        latex: "d=\\frac{1}{2}at^2",
        substitute: (a, t) => `d=\\frac{1}{2}(${a}\\text{ms}^{-2})(${t}\\text{s})^2`,
        resultFormat: d => `d=${d}\\text{m}`
    },
    {
        result: 'd',
        inputs: ['a', 't', 'v_o'],
        equation: (a, t, v_o) => 0.5 * a * Math.pow(t, 2) + v_o * t,
        latex: "d=\\frac{1}{2}at^2+v_ot",
        substitute: (a, t, v_o) => `d=\\frac{1}{2}(${a}\\text{ms}^{-2})(${t}\\text{s})^2+(${v_o}\\text{ms}^{-1})(${t}\\text{s})`,
        resultFormat: d => `d=${d}\\text{m}`
    },
    {
        result: 'd',
        inputs: ['v_{ave}', 't'],
        equation: (v_ave, t) => v_ave * t,
        latex: "d=v_{ave}t",
        substitute: (v_ave, t) => `d=(${v_ave}\\text{ms}^{-1})(${t}\\text{s})`,
        resultFormat: d => `d=${d}\\text{m}`
    },
    {
        result: 'a',
        inputs: ['d', 't'],
        equation: (d, t) => 2 * d / Math.pow(t, 2),
        latex: "a=\\frac{2d}{t^2}",
        substitute: (d, t) => `a=\\frac{2\\cdot${d}\\text{m}}{(${t}\\text{s})^2}`,
        resultFormat: a => `a=${a}\\text{ms}^{-2}`
    },
    {
        result: 'E_k',
        inputs: ['m', 'v'],
        equation: (m, v) => 0.5 * m * Math.pow(v, 2),
        latex: "E_k=\\frac{1}{2}mv^2",
        substitute: (m, v) => `E_k=\\frac{1}{2}(${m}\\text{kg})(${v}\\text{ms}^{-1})^2`,
        resultFormat: E_k => `E_k=${E_k}\\text{J}`
    },
    {
        result: 'p',
        inputs: ['m', 'v'],
        equation: (m, v) => m * v,
        latex: "p=mv",
        substitute: (m, v) => `p=${m}\\text{kg}\\cdot${v}\\text{ms}^{-1}`,
        resultFormat: p => `p=${p}\\text{Ns}`
    }
]

const UNITS = {
    m: '\\text{kg}',
    v: '\\text{ms}^-1',
    a: '\\text{ms}^-2',
    d: '\\text{m}'
}