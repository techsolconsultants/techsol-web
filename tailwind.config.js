const c = n => `hsl(var(--${n}) / <alpha-value>)`
export default { content: ['./index.html','./src/**/*.{ts,tsx}'],
 theme:{extend:{colors:{background:c('background'),foreground:c('foreground'),card:c('card'),border:c('border'),primary:c('primary'),'primary-foreground':c('primary-foreground'),accent:c('accent'),muted:c('muted-foreground'),warning:c('warning')},
 fontFamily:{sans:['Inter','system-ui','sans-serif']}}}, plugins:[] }
