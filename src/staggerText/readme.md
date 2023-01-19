# Stagger Text

Used and abused text stagger animation. Still cool maybe.

[Cloneable](/)

## How to

The implementation needs at least one attribute `data-a-split` to work.
Automatically adds the needed CSS.

#### Params

| Attribute       | Values                         | Default | \*  | Description                    |
| --------------- | ------------------------------ | ------- | --- | ------------------------------ |
| data-a-split    | char/word/line                 | --      | \*  | How's the text being split     |
| data-a-duration | {NUMBER} float or int          | 1.2     |     | Animation duration (s)         |
| data-a-each     | {NUMBER} float or int          | 0.02    |     | Animation stagger value (s)    |
| data-a-delay    | {NUMBER} float or int          | 0       |     | Animation delay (s)            |
| data-obs-once   | true / false                   | false   |     | Play once every time           |
| data-obs-t      | {NUMBER} float or int — 0 to 1 | .2      |     | Intersection Observer Treshold |
| data-obs-m      | {NUMBER}px / {NUMBER}%         | 10px    |     | Intersection Observer Margin   |

<!-- #### Long Description -->
