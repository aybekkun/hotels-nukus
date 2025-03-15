/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
