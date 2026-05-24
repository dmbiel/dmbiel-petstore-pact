# Pact Matchers

Pact matchers make contract tests strict about compatibility without locking the
provider to one exact JSON example. This project uses matchers to describe the
shape and allowed values of Petstore responses while still keeping the examples
readable.

## Why Matchers Matter

A brittle API test often compares a whole response with one exact object. That
can fail when an irrelevant example value changes, even if the consumer/provider
contract is still compatible.

A Pact contract should usually focus on the parts the consumer depends on:

- required fields;
- compatible data types;
- allowed enum values;
- array item structure;
- important headers;
- request shape for write operations.

Matchers express those expectations directly in the generated Pact contract.

## Matchers Used In This Project

The shared matchers live in:

```text
src/shared/petMatchers.ts
```

### `integer`

Used when the consumer needs a numeric integer value, but should not care about
one exact example.

```ts
id: integer(123);
```

This means the provider response must contain an integer for `id`. The generated
example value is `123`.

### `string`

Used when the consumer needs a string value.

```ts
name: string('Rex');
```

This means the provider response must contain a string for `name`. The generated
example value is `Rex`.

### `eachLike`

Used for arrays where each item should match the same expected shape.

```ts
photoUrls: eachLike(string('https://example.com/rex.jpg'));
```

This means `photoUrls` must be an array, and each item must be a string.

For arrays of objects, the matcher describes the expected object shape:

```ts
tags: eachLike({
  id: integer(10),
  name: string('friendly')
});
```

### `regex`

Used when a field or header must match a specific pattern.

```ts
status: regex('available|pending|sold', 'available');
```

This keeps the `status` field flexible across valid Petstore values while still
rejecting unsupported values.

The project also uses `regex` for the JSON content type header:

```ts
regex(/^application\/json(;\s?charset=[\w-]+)?$/i, 'application/json');
```

This accepts `application/json` and common variants such as
`application/json; charset=utf-8`.

### `like`

Used when the response should have the same structure as an example object, but
the contract should be type-based rather than exact-value-based.

```ts
createPetResponseMatcher = like(createPetRequestBody);
```

This is useful for the create pet scenario, where the provider returns the
created pet and the consumer cares about the shape of that object.

## Example: Pet Response Contract

The pet response matcher describes the fields `PetstoreClient` depends on:

```ts
export const petResponseMatcher = {
  id: integer(123),
  category: {
    id: integer(1),
    name: string('dogs')
  },
  name: string('Rex'),
  photoUrls: eachLike(string('https://example.com/rex.jpg')),
  tags: eachLike({
    id: integer(10),
    name: string('friendly')
  }),
  status: regex('available|pending|sold', 'available')
};
```

This verifies that:

- `id` is an integer;
- `category.id` is an integer;
- `category.name` is a string;
- `name` is a string;
- `photoUrls` is an array of strings;
- `tags` is an array of tag objects;
- `status` is one of `available`, `pending`, or `sold`.

## What Not To Do

Avoid writing consumer contract tests that only assert one exact response body:

```ts
expect(pet).toEqual({
  id: 123,
  name: 'Rex',
  photoUrls: ['https://example.com/rex.jpg'],
  status: 'available'
});
```

That style is useful in some unit tests, but it does not describe a flexible API
contract. Pact matchers should define compatibility rules, and the test
assertions should confirm that the consumer can use the generated example
response.

## Practical Rule

Use exact values when they are part of the expected request or scenario setup.
Use matchers when the provider is allowed to return any compatible value.

For this project:

- request bodies can stay concrete when the consumer sends a known payload;
- response bodies should use matchers for types, arrays, and enum-like values;
- headers should use matchers when real providers may include harmless variants;
- generated Pact files should be reviewed whenever matchers change.
