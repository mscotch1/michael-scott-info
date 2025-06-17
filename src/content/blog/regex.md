---
title: 'Practical RegEx'
description: 'RegEx features, syntax tips, and practical examples from Vim and the CLI.'
pubDate: 'Jun 17 2025'
heroImage: '/regex.jpg'
---

### Motivation

I try not to rely too heavily on [regular
expressions](https://en.wikipedia.org/wiki/Regular_expression) (or
“regex”) in my day-to-day coding. When a task involves string
parsing, I usually consider whether simpler, more maintainable options
exist. Regex often give me pause—mainly because I worry how someone
else (or future me) will interpret not just the expression itself,
but the intent behind it.

That said, regex is an incredibly powerful tool—sometimes the
right one for the job. For example, using an input field’s [`pattern`
attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#pattern)
can be a clean, declarative way to enforce client-side validation without
resorting to imperative JavaScript. And there are cases where a regex
can express in just a few characters what might otherwise take many
lines of code.

Personally, I find regex most useful when working in a text editor or
on the command line. In tools like Vim, ripgrep or sed, where the goal
is quick, one-off text manipulation, I don’t worry as much about
long-term readability or clarity of intent. In that context, their
concise, expressive power really shines.

### Basic Elements

To get on the same page, here’s a quick refresher of some common
and widely used regex elements.

| Symbol    | Meaning                                      |
|-----------|----------------------------------------------|
| `*`       | 0 or more occurrences of preceding atom      |
| `+`       | 1 or more occurrences of preceding atom      |
| `{m,n}`   | Between m and n (inclusive) occurrences      |
| `{,n}`    | At most n occurrences                        |
| `{m,}`    | At least m occurrences                       |
| `^`       | Match the beginning of a line                |
| `$`       | Match the end of a line                      |
| `\|`      | Alternation (match either side)              |
| `(...)`   | Grouping; also creates a capture group       |

For a full list of available symbols, you'll need to look at the man
page or help text for your particular tool or language.

### Variants

Regex and regex libraries are a feature present in many modern programming
languages. However, implementations differ, with some offering features
and syntax not found in other implementations. Many offer the user a
choice of which grammar to use, and it is this distinction that was
my main motivation in writing this blog post in the first place. The
differences in syntax are just significant enough to slow me down whenever
I use one vs. another, and I wanted to enumerate some of the most common
and useful elements from each.

#### BRE (Basic Regular Expression)

The BRE syntax is the default for most GNU utilities and various other
tools. It treats meta characters like `+` and `?` as literal characters
to be matched unless they are escaped with a backslash `\`.

#### ERE (Extended Regular Expression)

The ERE syntax does the opposite of BRE and requires
escaping meta characters for them to be treated as character
literals. In practice I find this to make regex more readable
and prevent them from suffering from [leaning toothpick
syndrome](https://en.wikipedia.org/wiki/Leaning_toothpick_syndrome). Note
that strictly POSIX-compliant ERE do not support back-references, though
in practice many tools extend this capability to ERE.

#### PCRE (Perl-Compatibile Regular Expression)

The PCRE syntax is like ERE but introduces some features that
otherwise would be very challenging or impossible to do with a BRE or
ERE. Foremost among these features is lazy matching, or the ability to
mark a preference for the match that uses as few characters as possible
for a given repeated atom. This is as opposed to the default greedy
matching used by the standard `*` or `+`. PCRE also support recursion
and named capture groups, and is the progenitor of back-references which
were later ported to BRE and ERE implementations.

#### Vim Search

Vim's regex engine is its own beast, though for better or worse it is
also what I use most in this list.  It supports features not typically
found in POSIX-style engines and changes syntax rules based on optional
mode prefixes.

Here are a few Vim-specific features I often use:

- `\v` enables "very magic" mode, where most characters are treated as
    regex operators by default. For example:
  - `:g/\vfoo\d+/` searches for lines containing “foo” followed by
      one or more digits. Notice the `+` does not need to be escaped.

The remaining examples are expressed in very magic mode to make
them easier to read.

- `\zs` and `\ze` mark the start and end of the match, useful when
    you want to operate only on a substring. I find these easier than
    lookahead and lookbehind (see below) in simple cases
    - `%s/\v^\zs\ze\w/- /` adds `- ` to the beginning of each non-indented line
- `@=`, `@!`, `@<` and `@<!` (lookahead and lookbehind) make assertions
    about a match's surroundings.
  - `/\v^(\s+)@<!\w+` matches the first word of each line that is
    not indented
- `:s` uses regex for search and replacement:
  - `:s/\v(\w+)/\u\1/g` capitalizes each word in the current line.
  - search can contain an optional range in front of the s, hence
    - `%s/foo/bar/g` replaces all occurrences of the string "foo" with
    "bar" in the current buffer
    - `'<,'>s/foo/bar/g` replaces all occurrences of the string "foo"
    with "bar" in the current visual selection. I use this a lot to perform
    replacement operations on only portions of files.
  - search can use capture groups to make dynamic replacements
    - `%s/\v(\w+)/\1\1/g` doubles every word in the current buffer
      (not sure why you'd ever want to do this...)

Vim also supports backreferences and advanced submatches in replacements, though the syntax differs slightly from PCRE.

For more complex editing, I often combine regex with macros or visual block mode.

### RegEx with CLI tools

As an example, here is a bash function in my `.bashrc` that gives me an
editor-like fuzzy find experience when searching many files for a regex.

```bash
function rgz() {
  rg --pcre2 "$1" -n | fzf --delimiter ":" --preview "bat --style numbers
  \ --color always --highlight-line {2} {1}" | cut -f1 -d:
}
```

It takes the results of running ripgrep with a Perl-Compatible Regular
Expression and shows them in FZF's excellent picker interface. Because
this function prints the filepath after the user presses `Enter`, it
can be composed with other commands in turn.

### Conclusion
Regex isn’t always the right tool—but when it is, it’s hard to beat
for speed and concision. Whether I’m quickly transforming lines in Vim,
digging through code with ripgrep, or tweaking validation in a web form,
when the situation calls for it, I find myself reaching for regex.

If you’re just getting started, I recommend sticking to a few core
symbols and experimenting in safe, disposable contexts like text editors
or CLI tools. And don’t worry if you have to look up the syntax every
time—most of us do.

Over time, your own mini-regex toolkit will emerge, shaped by the tools
you use and the problems you solve.

### Further Reading & Tools
- 📘 [regex101](https://regex101.com/) — Live PCRE tester with explanations, highlighting, and a quick reference.
- 📚 [Vim Regex Guide](https://vim.fandom.com/wiki/Regular_expressions) — Covers Vim’s magic modes and substitution quirks.
- 🧠 [Regular Expressions 101 (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) — A JS-focused but generally useful regex overview.
