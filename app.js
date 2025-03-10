const DengueBedAllocationSlider = () => {
  const [emptyBeds, setEmptyBeds] = React.useState(10);
  const maxBeds = 40;
  
  // Function to calculate dengue bed allocation based on empty beds
  const calculateDengueAllocation = (empty) => {
    // For very limited availability, prioritize a minimum number of dengue beds
    if (empty <= 3) return Math.max(1, Math.floor(empty * 0.5)); // At least 1 bed if any available
    
    // For normal operations with high occupancy
    const percentage = empty <= 10 ? 0.3 : (empty <= 20 ? 0.25 : 0.2);
    
    // Calculate allocation but ensure we don't exceed the expected 5-10 dengue cases
    const allocation = Math.round(empty * percentage);
    
    // Cap at 10 beds total for dengue as per ward typical occupancy
    return Math.min(allocation, 10);
  };

  const dengueBeds = calculateDengueAllocation(emptyBeds);
  const generalBeds = emptyBeds - dengueBeds;
  
  // Calculate bed utilization
  const occupiedBeds = maxBeds - emptyBeds;
  const occupancyRate = ((occupiedBeds / maxBeds) * 100).toFixed(1);
  
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Ward 6B Bed Allocation</h1>
        <p className="text-sm text-gray-600">40-Bedded Ward (98.5% Average Occupancy)</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Empty Beds: {emptyBeds}</span>
          <span className="text-sm font-medium text-blue-600">Current Occupancy: {occupancyRate}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="13"
          value={emptyBeds}
          onChange={(e) => setEmptyBeds(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>3</span>
          <span>6</span>
          <span>9</span>
          <span>13</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-red-800">Dengue Cases</h2>
          <p className="text-3xl font-bold text-red-600">{dengueBeds}</p>
          <p className="text-xs text-red-700 mt-1">beds to be allocated</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-green-800">General Cases</h2>
          <p className="text-3xl font-bold text-green-600">{generalBeds}</p>
          <p className="text-xs text-green-700 mt-1">remaining beds</p>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">Current Ward Status</h3>
        <div className="flex justify-between text-sm">
          <div>
            <p><span className="font-medium">Total Beds:</span> 40</p>
            <p><span className="font-medium">Available:</span> {emptyBeds}</p>
          </div>
          <div>
            <p><span className="font-medium">Dengue Allocation:</span> {dengueBeds}</p>
            <p><span className="font-medium">General Allocation:</span> {generalBeds}</p>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          <p>• Daily discharges: 6-13 patients</p>
          <p>• Typical ward occupancy: 5-10 dengue cases, remainder general</p>
          <p>• Bed occupancy rate: 98.5% average</p>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-xs text-yellow-800">
        <p className="font-medium">Note for staff:</p>
        <p>Ward beds are typically full by next morning. This tool helps balance bed allocation during the limited discharge windows.</p>
      </div>
    </div>
  );
};

// Render the App
const App = () => {
  return (
    <div>
      <DengueBedAllocationSlider />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
