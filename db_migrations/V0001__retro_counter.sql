CREATE TABLE IF NOT EXISTS t_p68468339_mobile_video_photo_s.retro_counter (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) UNIQUE NOT NULL,
    hits BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO t_p68468339_mobile_video_photo_s.retro_counter (name, hits)
VALUES ('retro_index', 1487)
ON CONFLICT (name) DO NOTHING;

CREATE TABLE IF NOT EXISTS t_p68468339_mobile_video_photo_s.retro_counter_seen (
    ip_hash VARCHAR(64) PRIMARY KEY,
    seen_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_retro_seen_at
    ON t_p68468339_mobile_video_photo_s.retro_counter_seen (seen_at);