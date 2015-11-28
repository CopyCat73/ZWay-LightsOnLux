# Zway Lights on Lux

Zway Automation module for controlling lights based on outside lux

# Configuration

    - Select your lux measurement sensor
    - Select one or more lights to control
    - Set on level
    - Set off level
    
The on level is the lux level below which the lights turn on. The off level is the level at which
they turn off again. Ideally there should be a reasonable margin between the two. This module will ignore "on"
events once it's switched devices on (it has to return to off level again) and vice versa. 


# License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any 
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
