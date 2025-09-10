# 🎯 NEATO-FX SmartTarget System

The Smart Target is a modular WiFi enabled target for shooting galleries, interactive attractions, and advanced automation entertainment applications. 
These targets are unique in that it is an all-in-one solution to control props with colorful eye-catching visuals.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Hardware](#hardware)
- [Software](#software)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The NEATO-FX SmartTarget is a modular, wireless target system designed for:
- **Gaming**: Interactive laser tag and shooting games
- **Entertainment**: Party games and competitive events
- **Education**: STEM learning projects and maker space applications
- **Training Applications**: Law enforcement, military, and civilian shooting practice
- **Home Automation**: Trigger lights, sound effects, or other smart devices when the target is hit—perfect for interactive lighting, party games, or immersive smart home experiences.


Each target features infrared detection, customizable LED effects, relay outputs for external devices, and a responsive web interface for real-time control and monitoring.

## ✨ Features

### Core Functionality
- **🔴 IR Detection**: Multi-protocol infrared receiver (Laser Tag, NEC, Raw protocols)
- **💡 RGB LED Effects**: Dual LED strip support with custom animations
- **⚡ Relay Output**: 2A relay for external device control
- **🌐 WiFi Connectivity**: Wireless control and monitoring
- **📱 Web Interface**: Mobile-friendly control panel with custom fire button
- **🔧 Real-time Configuration**: Adjustable timers and effects

### Smart Features
- **⏱️ Configurable Timers**: Hit duration, cooldown periods, relay activation times
- **🎨 Visual Effects**: Rainbow, color wipe, scanner, twinkle animations
- **📊 Sensor Monitoring**: Voltage monitoring on analog inputs
- **🔗 Digital I/O**: Digital inputs with pull-up configuration
- **📈 Status Reporting**: Uptime monitoring and system health
- **🔥 Manual Testing**: One-click target testing via web interface

### Network Capabilities
- **🏠 Standalone Mode**: Independent operation without external servers
- **🔗 Networked Mode**: Multi-target coordination with Home Assistant
- **🎭 FPP Integration**: Falcon Player support for synchronized light shows
- **🔄 OTA Updates**: Over-the-air firmware updates
- **📡 ESPHome Integration**: Full Home Assistant compatibility

## 🔧 Hardware

### Target Board Specifications
- **MCU**: ESP32 (Rev 1.x: Wemos D1 Mini32, Rev 3.x: ESP32-DevKitC)
- **Flash**: 4MB
- **Operating Voltage**: 7V-14V
- **WiFi**: 802.11 b/g/n
- **GPIO**: Multiple I/O pins for expansion

### Hardware Revisions
- **Rev 1.x**: Original design with Wemos D1 Mini32 form factor
- **Rev 3.x**: Enhanced design with additional GPIO, servo control, and auxiliary power

### Required Components
- Smart Target PCB (Rev 1.x or Rev 3.x)
- 12V 2-5A Power Supply
- Camera Mount

## 💻 Software

### Technology Stack
- **Framework**: [ESPHome](https://esphome.io/) 2025.8.0+
- **Platform**: ESP32 Arduino
- **Languages**: YAML configuration, C++ (lambdas), JavaScript (web UI)
- **Protocols**: WiFi, HTTP, IR (Laser Tag, NEC, Raw), FPP

### Modular File Structure
```
SmartTarget/
├── target_main.yaml                 # Main configuration assembly
├── boards/
│   ├── target_rev1_x.yaml          # Rev 1.x hardware definition
│   ├── target_rev3_x.yaml          # Rev 3.x hardware definition
│   └── common/
│       ├── target_common.yaml      # Shared components
│       ├── target_hit_script.yaml  # Hit processing logic
│       ├── color_controls.yaml     # LED color management
│       ├── custom.css              # Web UI styling
│       └── custom.js               # Web UI functionality
├── configs/
│   ├── target_networked_config.yaml # Home Assistant integration
│   ├── target_standalone_config.yaml # Independent operation
│   └── secrets.yaml               # WiFi credentials
├── protocols/
│   ├── ir_laser_tag.yaml          # Laser tag IR protocol
│   ├── ir_nec.yaml                # NEC IR protocol  
│   └── ir_raw.yaml                # Raw IR capture
├── integrations/
│   └── target_fpp.yaml            # Falcon Player integration
└── README.md                      # This file
```

## 🚀 Installation

### Prerequisites
1. **ESPHome**: Install via pip or Home Assistant add-on
2. **ESP32 Board**: Rev 3.x (Wemos D1 Mini32) 
3. **Hardware Setup**: Connect components according to pin configuration

### Quick Start
1. **Clone Repository**:
   ```bash
   git clone https://github.com/CodeMakesItGo/SmartTarget.git
   cd SmartTarget/esphome/SmartTarget
   ```

2. **Configure Target ID**:
   Edit `target_main.yaml` to set your unique target ID:
   ```yaml
   substitutions:
     id: "0001"  # Change to your target number (0001-9999)
   ```

3. **Select Hardware Revision**:
   Uncomment the appropriate line in `target_main.yaml`:
   ```yaml
   packages:
     # For Rev 1.x targets uncomment the next line
     #target_rev_file: !include boards/target_rev1_x.yaml
     # For Rev 3.x targets uncomment the next line  
     target_rev_file: !include boards/target_rev3_x.yaml
   ```

4. **Choose Operating Mode**:
   Select standalone or networked mode:
   ```yaml
   # Standalone mode (independent operation)
   #config_file: !include configs/target_standalone_config.yaml
   # Networked mode (Home Assistant integration)
   config_file: !include configs/target_networked_config.yaml
   ```

5. **Configure WiFi**:
   Edit `configs/secrets.yaml`:
   ```yaml
   wifi_ssid: "YourWiFiNetwork"
   wifi_password: "YourPassword"
   ```

6. **Select IR Protocol**:
   Choose your IR receiver protocol:
   ```yaml
   # Laser tag protocol (recommended)
   ir_receiver: !include protocols/ir_laser_tag.yaml
   # NEC protocol (TV remotes)
   #ir_receiver: !include protocols/ir_nec.yaml
   # Raw capture (development)
   #ir_receiver: !include protocols/ir_raw.yaml
   ```

7. **Compile and Flash**:
   ```bash
   # Compile configuration
   esphome -s id 0001 compile target_main.yaml
   
   # Flash to device
   esphome -s id 0001 upload target_main.yaml
   
   # Monitor logs
   esphome -s id 0001 logs target_main.yaml
   ```

8. **Access Web Interface**:
   - Find device at `http://target-0001.local` or IP address
   - Use the 🔥 FIRE button to test target functionality

### Optional: FPP Integration
For Falcon Player light show synchronization:
```yaml
# Uncomment in target_main.yaml
fpp_file: !include integrations/target_fpp.yaml

# Enable FPP script execution
script:
  - id: run_hit_script
    then:
      - script.execute: target_hit_script
      - script.execute: fpp_start_playlist  # Uncomment this line
```

## 🎮 Usage

### Basic Operation
1. **Power On**: Target initializes and connects to WiFi
2. **IR Detection**: Point IR remote/laser tag device at target
3. **Target Response**: LEDs activate, relay triggers, cooldown begins
4. **Web Control**: Access web interface for manual triggering and configuration

### Web Interface Features
- **🔥 FIRE Button**: Manual target activation (works on mobile!)
- **⚡ Test Target Hit**: ESPHome native test button
- **⚙️ Timer Controls**: Adjust relay and cooldown timers in real-time
- **🎨 Effect Selection**: Choose LED animation patterns
- **📊 Status Monitoring**: View system information and sensor data
- **💡 LED Controls**: Dual LED strip management (Rev 3.x)

### IR Protocol Support
The target supports multiple IR protocols based on configuration:
- **Laser Tag**: Custom laser tag protocol for gaming applications
- **NEC**: Most common TV/device remotes for testing
- **Raw**: Captures any IR signal for protocol analysis

### Manual Testing
Use the web interface to test target functionality:
1. Navigate to `http://target-XXXX.local`
2. Click the **🔥 FIRE** button for immediate testing
3. Or use the **⚡ Test Target Hit** switch
4. Watch for LED effects, relay activation, and timing sequences

### API Endpoints
Access target functions via HTTP requests:

```http
# Manual trigger (using discovered entity naming)
POST http://target-ip/switch/__test_target_hit/turn_on

# Relay control
POST http://target-ip/switch/relay_1/turn_on
POST http://target-ip/switch/relay_1/turn_off

# LED control (primary strip)
POST http://target-ip/light/target_leds/turn_on
POST http://target-ip/light/target_leds/turn_off

# LED control (secondary strip - Rev 3.x)
POST http://target-ip/light/led_strip_2/turn_on
POST http://target-ip/light/led_strip_2/turn_off
```

### Multi-Target Coordination
In networked mode, targets can be coordinated via Home Assistant:
- Centralized control of multiple targets
- Synchronized effects across target arrays
- Game mode management and scoring
- Real-time status monitoring

### FPP Integration (Advanced)
When FPP integration is enabled:
- Target hits trigger Falcon Player playlists
- Synchronized light shows across multiple devices
- Professional lighting control for entertainment venues

## 🔧 Troubleshooting

### Common Issues

**Target not responding to IR**:
- Check IR receiver wiring (VCC, GND, Signal to configured GPIO)
- Verify IR receiver orientation (dome facing forward)
- Enable debug logging to see IR signal capture
- Ensure correct IR protocol is selected in configuration
- Try different laser tag devices or IR remotes

**Fire button not working**:
- Check web console for JavaScript errors
- Verify template switch is properly defined with `optimistic: true`
- Confirm entity naming: ESPHome converts "⚡ Test Target Hit" to `__test_target_hit`
- Test direct API endpoint: `/switch/__test_target_hit/turn_on`

**WiFi connection problems**:
- Verify SSID and password in `configs/secrets.yaml`
- Check signal strength at target location
- Use 2.4GHz WiFi (ESP32 doesn't support 5GHz)
- Try factory reset (power cycle 3 times rapidly)

**LEDs not working**:
- Confirm WS2812 wiring (5V power, GND, Data to configured GPIO)
- Check power supply capacity (6 LEDs = ~360mA max)
- Verify LED strip type and count in configuration
- Test with different LED effects from web interface

**Web interface not loading**:
- Check if device is connected to WiFi (look for target-XXXX.local)
- Try accessing by IP address instead of hostname
- Clear browser cache and disable ad blockers
- Verify firewall settings allow HTTP traffic

**OTA upload failures**:
- Ensure device is powered and connected to WiFi
- Try uploading via USB cable first
- Check ESPHome version compatibility
- Verify sufficient flash memory available

**Configuration compilation errors**:
- Check YAML syntax and indentation
- Verify all included files exist in correct directories
- Ensure substitutions are properly defined
- Check ESPHome logs for specific error details

### Debug Mode
Enable detailed logging:
```yaml
logger:
  level: DEBUG  # Set to WARN for production use
```

### Factory Reset
To reset configuration:
1. Power cycle device 3 times rapidly (within 10 seconds)
2. Device will create WiFi access point "SmartTarget-XXXX"
3. Connect and reconfigure via captive portal
4. Or reflash firmware via USB

### Hardware Debugging
- Use multimeter to verify power supply voltages
- Check GPIO continuity with oscilloscope
- Verify LED strip data signal integrity
- Test IR receiver with known working remote

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly on actual hardware
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Create Pull Request

### Code Standards
- Follow ESPHome YAML conventions and best practices
- Use the modular file structure (don't put everything in one file)
- Comment complex lambda functions and logic
- Test on both Rev 1.x and Rev 3.x hardware when possible
- Update documentation for new features
- Maintain backward compatibility where feasible

### Modular Architecture
When adding new features:
- **Hardware-specific**: Add to appropriate `boards/target_revX_x.yaml`
- **Protocol support**: Create new file in `protocols/`
- **Integrations**: Add to `integrations/` directory
- **Common functionality**: Update `boards/common/target_common.yaml`
- **Configuration modes**: Modify files in `configs/`

### Testing Checklist
- [ ] Configuration compiles without errors
- [ ] OTA updates work properly
- [ ] Web interface loads and functions correctly
- [ ] Fire button triggers target sequence
- [ ] IR detection works with intended protocols
- [ ] LED effects display properly
- [ ] Relay outputs function as expected
- [ ] WiFi connectivity is stable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ESPHome Team**: For the excellent IoT framework
- **ESP32 Community**: For hardware support and libraries
- **NEATO-FX Team**: Hardware design and system integration
- **Contributors**: Everyone who has helped improve this project

## 📞 Support
- **Issues**: [GitHub Issues](https://github.com/CodeMakesItGo/SmartTarget/issues)
- **Discussions**: [GitHub Discussions](https://github.com/CodeMakesItGo/SmartTarget/discussions)
- **Documentation**: [Documents Folder](./documents/)
- **Email**: [jason.altice@codemakesitgo.com](mailto:jason.altice@codemakesitgo.com)

---

**Made with ❤️ by the NEATO-FX Team**
*Last updated: September 2025*