CREATE SCHEMA cs_panel;

CREATE TABLE cs_panel.servers (
    server_id SERIAL PRIMARY KEY,
    server_name VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    port INTEGER NOT NULL,
    max_players INTEGER,
    game_mode VARCHAR(50),
    map VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'Offline',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cs_panel.players (
    player_id SERIAL PRIMARY KEY,
    steam_id VARCHAR(20) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    score INTEGER DEFAULT 0,
    kills INTEGER DEFAULT 0,
    deaths INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    join_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    leave_time TIMESTAMP
);

CREATE TABLE cs_panel.server_config (
    config_id SERIAL PRIMARY KEY,
    server_id INTEGER NOT NULL REFERENCES servers(server_id) ON DELETE CASCADE,
    config_name VARCHAR(100) NOT NULL,
    config_value TEXT NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_server_ip_port ON servers (ip_address, port);
CREATE INDEX idx_player_steam_id ON players (steam_id);
CREATE INDEX idx_config_server_id ON server_config (server_id);
