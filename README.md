# arrkup

**JSON array to HTML string converter**

this:

```ts
arrkup([
    [null, '<!DOCTYPE html>'],
    ['html',
        ['head',
            ['meta/', { charset: 'UTF-8' }],
            ['title', 'Arrkup - get a <tag>']
        ],
        ['body',
            ['h1', { 'class': 'my-h1 the-title' }, 'Arrkup & fun'],
            ['input/', { name: 'zero', value: 0 }],
            ['input/', { name: 'eight-point-three', value: 8.3 }],
            ['input/', { name: '1e21', value: 1e+21 }],
            ['input/', { name: '1e-7', value: 1e-7 }],
            ['input/', { name: 'nan', value: NaN }],
            ['input/', { name: 'infinity', value: Infinity }],
            ['input/', { name: 'negative-infinity', value: -Infinity }],
            ['input/', { name: 'true', value: true }],
            ['input/', { name: 'false', value: false }],
            ['input/', { name: 'empty-string', value: '' }],
            [null, '<!-- Content START -->'],
            ['a', { href: 'http://example.com?foo=bar&baz=quux', title: 'I say, "Click me"' }, 'It\'s clicking time']
        ]
    ]
])
```

becomes:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Arrkup - get a &lt;tag&gt;</title>
    </head>
    <body>
        <h1 class="my-h1 the-title">Arrkup &amp; fun</h1>
        <input name="zero" value="0" />
        <input name="eight-point-three" value="8.3" />
        <input name="1e21" value="1e+21" />
        <input name="1e-7" value="1e-7" />
        <input name="nan" value="" />
        <input name="infinity" value="" />
        <input name="negative-infinity" value="" />
        <input name="true" value />
        <input name="false" />
        <input name="empty-string" value="" />
        <!-- Content START -->
        <a href="http://example.com?foo=bar&amp;baz=quux" title="I say, &quot;Click me&quot;">It&#39;s clicking time</a>
    </body>
</html>
```

except minified:

```html
<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Arrkup - get a &lt;tag&gt;</title></head><body><h1 class="my-h1 the-title">Arrkup &amp; fun</h1><input name="zero" value="0"/><input name="eight-point-three" value="8.3"/><input name="1e21" value="1e+21"/><input name="1e-7" value="1e-7"/><input name="nan" value=""/><input name="infinity" value=""/><input name="negative-infinity" value=""/><input name="true" value/><input name="false"/><input name="empty-string" value=""/><!-- Content START --><a href="http://example.com?foo=bar&amp;baz=quux" title="I say, &quot;Click me&quot;">It&#39;s clicking time</a></body></html>
```
