# `blub` framework

This project is my personal learning project. I want to explore what it takes to
write a front-end framework. Please, do **not** use this framework in production!

## How to write a component

A typical component looks like this:

```html
<template greet="World">
	<div>
		<h1>Hello ${greet}!</h1>
		<my-other-component></my-other-component>
	</div>
</template>
```
