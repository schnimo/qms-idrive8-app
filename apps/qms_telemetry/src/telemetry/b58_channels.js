const QMSTelemetry = {
    channels: {
        boostPressure: { id: 0x10A, scale: 0.01, unit: 'psi', elementId: 'boost-val' },
        oilTemperature: { id: 0x10B, scale: 1.0, unit: '°C', elementId: 'oil-val' },
        ethanolContent: { id: 0x10C, scale: 0.1, unit: '%', elementId: 'eth-val' }
    },
    
    init() {
        console.log("QMS Telemetry Engine Initialized");
        this.bindListeners();
    },

    bindListeners() {
        if (window.bmw?.vehicle?.subscribe) {
            const ids = Object.values(this.channels).map(c => c.id);
            window.bmw.vehicle.subscribe(ids, (packet) => this.processData(packet));
        } else {
            console.warn("BMW vehicle API not detected. Running telemetry simulation mode.");
            this.startSimulation();
        }
    },

    processData(packet) {
        const channel = Object.values(this.channels).find(c => c.id === packet.canId);
        if (!channel) return;
        const rawValue = parseInt(packet.data, 16);
        const scaledValue = (rawValue * channel.scale).toFixed(1);
        const el = document.getElementById(channel.elementId);
        if (el) el.innerText = scaledValue;
    },

    startSimulation() {
        setInterval(() => {
            document.getElementById('boost-val')?.setAttribute('innerText', (18.5 + Math.random() * 0.5).toFixed(1));
            document.getElementById('oil-val')?.setAttribute('innerText', Math.floor(98 + Math.random() * 2));
            document.getElementById('eth-val')?.setAttribute('innerText', (45.0).toFixed(1));
        }, 500);
    }
};

export default QMSTelemetry;
