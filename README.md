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

Each target features infrared detection, customizable LED effects, relay outputs for external devices, and a responsive web interface for real-time control and monitoring.

## ✨ Features

### Core Functionality
- **🔴 IR Detection**: Multi-protocol infrared receiver (NEC, Sony, RC5, Samsung, Pronto)
- **💡 RGB LED Effects**: Colorful custom target effects
- **⚡ Relay Output**: 2A relay for external device control
- **🌐 WiFi Connectivity**: Wireless control and monitoring
- **📱 Web Interface**: Mobile-friendly control panel
- **🔧 Real-time Configuration**: Adjustable timers and effects

### Smart Features
- **⏱️ Configurable Timers**: Hit duration, cooldown periods, relay activation times
- **🎨 Visual Effects**: Rainbow, color wipe, scanner, twinkle animations
- **📊 Sensor Monitoring**: Voltage monitoring on analog inputs
- **🔗 Digital I/O**: Digital inputs with pull-up configuration
- **📈 Status Reporting**: Uptime monitoring and system health

### Network Capabilities
- **🏠 Standalone Mode**: Independent operation
- **🔗 Networked Mode**: Multi-target coordination 
- **🔄 OTA Updates**: Over-the-air firmware updates
- **📡 ESPHome Integration**: Home Assistant compatibility

## 🔧 Hardware

### Target Board Specifications
- **MCU**: ESP32 (Wemos D1 Mini32 compatible)
- **Flash**: 4MB
- **Operating Voltage**: 3.3V/5V
- **WiFi**: 802.11 b/g/n
- **GPIO**: 16 available pins

### Required Components
- Smart Target
- 12V 2-5A Power Supply

## 💻 Software

### Technology Stack
- **Framework**: [ESPHome](https://esphome.io/) 2024.6.0+
- **Platform**: ESP32 Arduino
- **Languages**: YAML configuration, C++ (lambdas), JavaScript (web UI)
- **Protocols**: WiFi, HTTP, IR (multiple protocols)

### File Structure
```
SmartTarget/
├── target_rev1_x.yaml          # Rev 1.x configuration
├── target_rev3_x.yaml          # Rev 3.x configuration  
├── color_controls.yaml         # LED color management
├── target_networked_config.yaml # Network mode settings
├── target_standalone_config.yaml # Standalone mode settings
├── custom.css                  # Web UI styling
├── custom.js                   # Web UI functionality
└── README.md                   # This file
```

## 🚀 Installation

### Prerequisites
1. **ESPHome**: Install via pip or Home Assistant add-on
2. **ESP32 Board**: Any ESP32 development board
3. **Hardware Setup**: Connect components according to pin configuration

### Quick Start
1. **Clone Repository**:
   ```bash
   git clone https://github.com/yourusername/neato-fx-smarttarget.git
   cd neato-fx-smarttarget/esphome/SmartTarget
   ```

2. **Select Hardware Revision**:
   Choose the appropriate configuration file for your hardware:
   - `target_rev1_x.yaml` - For Rev 1.x boards
   - `target_rev3_x.yaml` - For Rev 3.x boards

3. **Configure WiFi**:
   ```yaml
   # Add to target_networked_config.yaml or target_standalone_config.yaml
   wifi:
     ssid: "YourWiFiNetwork"
     password: "YourPassword"
   ```

4. **Compile and Flash**:
   ```bash
   # For Rev 1.x
   esphome compile target_rev1_x.yaml
   esphome upload target_rev1_x.yaml
   
   # For Rev 3.x
   esphome compile target_rev3_x.yaml  
   esphome upload target_rev3_x.yaml
   ```

5. **Access Web Interface**:
   - Find device IP in router or ESPHome logs
   - Open `http://target-ip-address` in browser

### Configuration Options

#### Target Mode Selection
Choose between standalone or networked operation by uncommenting the appropriate package:

```yaml
packages:
  # Standalone mode (independent operation)
  config_file: !include target_standalone_config.yaml
  
  # Networked mode (multi-target coordination)
  # config_file: !include target_networked_config.yaml
```

#### Timing Configuration
Adjust default timing values in substitutions:

```yaml
substitutions:
  hit_display_time: "3000"       # LED effect duration (ms)
  default_relay_time: "3000"     # Relay activation time (ms)
  default_cooldown_time: "1000"  # Target cooldown period (ms)
```

## 🎮 Usage

### Basic Operation
1. **Power On**: Target initializes and connects to WiFi
2. **IR Detection**: Point IR remote at target and press any button
3. **Target Response**: LEDs activate, relay triggers, cooldown begins
4. **Web Control**: Access web interface for manual triggering and configuration

### Web Interface Features
- **🔥 Trigger Button**: Manual target activation
- **⚙️ Timer Controls**: Adjust relay and cooldown timers
- **🎨 Effect Selection**: Choose LED animation patterns
- **📊 Status Monitoring**: View system information and sensor data

### IR Remote Setup
The target supports multiple IR protocols:
- **NEC**: Most common TV/device remotes
- **Sony**: Sony brand remotes
- **RC5**: Philips/European standard
- **Samsung**: Samsung device remotes
- **Pronto**: Raw timing protocol

To capture your remote's signal:
1. Enable debug logging
2. Point remote at target and press button
3. Check logs for protocol detection
4. System automatically responds to detected signals

### API Endpoints
Access target functions via HTTP requests:

```http
# Manual trigger
POST http://target-ip/switch/test_button/turn_on

# Relay control
POST http://target-ip/switch/relay/turn_on
POST http://target-ip/switch/relay/turn_off

# LED control
POST http://target-ip/light/target_leds/turn_on
POST http://target-ip/light/target_leds/turn_off
```

## 🔧 Troubleshooting

### Common Issues

**Target not responding to IR**:
- Check IR receiver wiring (VCC, GND, Signal to GPIO19)
- Verify IR receiver orientation (dome facing forward)
- Enable debug logging to see IR signal capture
- Try different remote controls

**WiFi connection problems**:
- Verify SSID and password in configuration
- Check signal strength at target location
- Use 2.4GHz WiFi (ESP32 doesn't support 5GHz)

**LEDs not working**:
- Confirm WS2812 wiring (VCC=5V, GND, Data to GPIO5)
- Check power supply capacity (6 LEDs = ~360mA max)
- Verify LED strip type (WS2812B recommended)

**Web interface not loading**:
- Check if device is connected to WiFi
- Try accessing by IP address instead of hostname
- Clear browser cache
- Verify firewall settings

### Debug Mode
Enable detailed logging by setting:
```yaml
logger:
  level: DEBUG
```

### Factory Reset
To reset configuration:
1. Power cycle device 3 times rapidly
2. Device will create WiFi access point "SmartTarget-XXXX"
3. Connect and reconfigure via captive portal

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test thoroughly
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Create Pull Request

### Code Standards
- Follow ESPHome YAML conventions
- Comment complex lambda functions
- Test on actual hardware before submitting
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ESPHome Team**: For the excellent IoT framework
- **ESP32 Community**: For hardware support and libraries
- **Contributors**: Everyone who has helped improve this project

## 📞 Support
- **Documentation**:  [Documents Folder](../../../Documents/)
- **Email Questions**: [email: jason.altice@codemakesitgo.com](mailto:jason.altice@codemakesitgo.com)
---

**Made with ❤️ by the NEATO-FX Team**