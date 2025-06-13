---
title: 'First Post'
description: 'FizzBuzz in TypeScript'
pubDate: 'Jun 12 2025'
heroImage: '/blog-placeholder-3.jpg'
---

Hello! This blog post is a test everything is set up properly. I
thought I'd test out the code syntax highlighting feature, so here's a
[FizzBuzz](https://en.wikipedia.org/wiki/Fizz_buzz) program in TypeScript.

```ts
function fizzBuzz(n: number): void {
  for (let i = 0; i < n; ++i) {
    let output = "";

    if (i % 3 === 0) {
        output += "Fizz";
    }
    if (i % 5 === 0) {
        output += "Buzz";
    }

    console.log(output || i);
  }
}

fizzBuzz(100);
```

Thanks for reading!
