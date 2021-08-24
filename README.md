![Banner](https://user-images.githubusercontent.com/38297449/130655212-266b8f56-a2bb-4e1f-9640-f2772ece71d2.jpg)

## The problem.

With the release of iOS 14, Apple introduced a new feature for HomeKit called Adaptive Light. In essence, the software controls smart lights their brightness and temperature all day long so they match the light outside. Cold and bright at day, dim and warm at night, gradually fading in between. 

Unfortunately, Apple deemed my iPad mini 2 unworthy so I set out to recreate the functionality myself using the RESTful API offered by the Philips Hue bridge. 

## The extras.

HomeKit Adaptive Light is fairly limited, so I intend to add extra features such as:
- Customizing the location for which Solstice calculates/retrieves the sunrise, solar noon, sunset, etc.. This means you can mimic a "normal" day even if you happen to live on Antarctica, for example.
- Changing the applications internal clock so you can shift your day a certain amount of time, for example if you work at night or want to pro-actively combat jetlag.
- Modifying the date used to retrieve/calculate the suntimings. For example, compensate for the early sunsets in winter by picking a day in spring/fall.

## The goal.

Since most people don't have a computer running 24/7 the main goal of Solstice is to eventually port it to the C language so it can run on inexpensive microcomputers such as the ESP32 that use virtually no energy.
