I have a button with an LED. I'd like to use the LED to show there is a notification and the button to mark it as received.

- NodeJS server that tracks state and provides endpoints to toggle it
- Arduino code to poll server, light LED when notification available and mark notification as received when the button is pushed
- Possibly a command line utility that runs a command and tells the server to begin notifying when the command is complete
