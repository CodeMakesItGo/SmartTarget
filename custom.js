// NEATO Target Control System - Basic Version
// Simple interface enhancement for ESPHome

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 NEATO Target Control System - Basic Version Loading...');
    
    // Apply basic styling and header
    addCustomHeader();
    applyBasicStyling();
    
    console.log('✅ NEATO Target Control System - Basic Version Ready!');
});

function addCustomHeader() {
    // Get target ID from hostname
    const hostname = window.location.hostname;
    const match = hostname.match(/target-(.{4})/);
    const targetId = match ? match[1] : (hostname || 'Device');
    
    // Create header element
    const header = document.createElement('div');
    header.className = 'neato-header';
    header.innerHTML = `
        <h1>🎯 NEATO Target Control System</h1>
        <p>Target ID: ${targetId}</p>
        <button id="trigger-button" class="neato-trigger-btn">🔥 TRIGGER TARGET</button>
    `;
    
    // Insert at the beginning of the body
    document.body.insertBefore(header, document.body.firstChild);
    
    // Add button functionality
    setupTriggerButton();
}

function setupTriggerButton() {
    const triggerBtn = document.getElementById('trigger-button');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', function() {
            triggerTarget();
        });
    }
}

function triggerTarget() {
    // Show firing animation
    const triggerBtn = document.getElementById('trigger-button');
    triggerBtn.classList.add('firing');
    triggerBtn.innerHTML = '💥 FIRING...';
    triggerBtn.disabled = true;
    
    console.log('🎯 Starting trigger sequence...');
    
    // Since ESPHome web interface has JavaScript errors, use direct API calls
    const hostname = window.location.hostname;
    const port = window.location.port || '80';
    
    // Try multiple trigger approaches
    triggerViaAPI(hostname, port)
        .then(success => {
            console.log('🎯 API trigger result:', success);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                triggerBtn.classList.remove('firing');
                triggerBtn.innerHTML = '🔥 TRIGGER TARGET';
                triggerBtn.disabled = false;
                
                if (success) {
                    // Show success feedback
                    triggerBtn.classList.add('success');
                    triggerBtn.innerHTML = '✅ TARGET HIT!';
                    setTimeout(() => {
                        triggerBtn.classList.remove('success');
                        triggerBtn.innerHTML = '🔥 TRIGGER TARGET';
                    }, 1500);
                } else {
                    // Show error feedback
                    triggerBtn.classList.add('error');
                    triggerBtn.innerHTML = '❌ TRIGGER FAILED';
                    setTimeout(() => {
                        triggerBtn.classList.remove('error');
                        triggerBtn.innerHTML = '🔥 TRIGGER TARGET';
                    }, 1500);
                }
            }, 2000);
        })
        .catch(error => {
            console.error('🚨 Trigger error:', error);
            
            // Reset button on error
            setTimeout(() => {
                triggerBtn.classList.remove('firing');
                triggerBtn.classList.add('error');
                triggerBtn.innerHTML = '❌ CONNECTION ERROR';
                triggerBtn.disabled = false;
                
                setTimeout(() => {
                    triggerBtn.classList.remove('error');
                    triggerBtn.innerHTML = '🔥 TRIGGER TARGET';
                }, 1500);
            }, 1000);
        });
}

async function triggerViaAPI(hostname, port) {
    // ESPHome API endpoints to try - focusing on test_button as template switch
    const endpoints = [
        '/switch/test_button/turn_on',         // Your test button as template switch
        '/switch/test_button/toggle',          // Alternative toggle format
        '/api/switch/test_button/turn_on',     // API prefix version
        '/api/switch/test_button/toggle',      // API prefix toggle
        '/switch/test_button',                 // Simple format
        '/button/test_button/press',           // In case it's also exposed as button
        '/api/button/test_button/press'        // API button format
    ];
    
    const baseUrl = `http://${hostname}${port !== '80' ? ':' + port : ''}`;
    
    for (const endpoint of endpoints) {
        try {
            console.log(`� Trying: ${baseUrl}${endpoint}`);
            
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            
            if (response.ok) {
                console.log(`✅ Success with: ${endpoint}`);
                return true;
            }
            
            console.log(`❌ Failed ${endpoint}: ${response.status}`);
            
        } catch (error) {
            console.log(`❌ Error ${endpoint}:`, error.message);
        }
    }
    
    // If API calls fail, try GET requests (some ESPHome versions use GET)
    const getEndpoints = [
        '/switch/test_button/turn_on',
        '/switch/test_button/toggle'
    ];
    
    for (const endpoint of getEndpoints) {
        try {
            console.log(`🔄 Trying GET: ${baseUrl}${endpoint}`);
            
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'GET'
            });
            
            if (response.ok) {
                console.log(`✅ Success with GET: ${endpoint}`);
                return true;
            }
            
        } catch (error) {
            console.log(`❌ GET Error ${endpoint}:`, error.message);
        }
    }
    
    return false;
}

function applyBasicStyling() {
    const style = document.createElement('style');
    style.textContent = `
        /* NEATO Header Styling */
        .neato-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 20px;
            margin: -8px -8px 20px -8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .neato-header h1 {
            margin: 0 0 10px 0;
            font-size: 2.2em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .neato-header p {
            margin: 0 0 15px 0;
            font-size: 1.1em;
            opacity: 0.9;
            font-weight: 500;
        }
        
        /* Trigger Button Styling */
        .neato-trigger-btn {
            background: linear-gradient(45deg, #ff4757, #ff3742);
            border: none;
            color: white;
            padding: 15px 30px;
            font-size: 1.2em;
            font-weight: bold;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .neato-trigger-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 71, 87, 0.6);
            background: linear-gradient(45deg, #ff3742, #ff2d3a);
        }
        
        .neato-trigger-btn:active {
            transform: translateY(0);
        }
        
        .neato-trigger-btn.firing {
            background: linear-gradient(45deg, #ffa500, #ff8c00);
            animation: pulse 0.5s infinite alternate;
            box-shadow: 0 6px 20px rgba(255, 165, 0, 0.6);
        }
        
        .neato-trigger-btn.success {
            background: linear-gradient(45deg, #2ecc71, #27ae60);
            box-shadow: 0 6px 20px rgba(46, 204, 113, 0.6);
        }
        
        .neato-trigger-btn.error {
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            box-shadow: 0 6px 20px rgba(231, 76, 60, 0.6);
        }
        
        .neato-trigger-btn:disabled {
            cursor: not-allowed;
            opacity: 0.8;
        }
        
        @keyframes pulse {
            0% { transform: translateY(-2px) scale(1); }
            100% { transform: translateY(-2px) scale(1.05); }
        }
        
        /* Improve overall page styling */
        body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
        }
    `;
    
    document.head.appendChild(style);
}