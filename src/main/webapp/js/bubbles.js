function setBubbles(unId) {

    d3.select('g').attr('flag', 'par')

    _.each(["left", "right"], function (id) {
        var svg = d3.select("#"+id),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var format = d3.format(",d");

        var pack = d3.pack()
            .size([width - 2, height - 2])
            .padding(3);

        d3.json("./data/tags.json", function (error, data) {
            if (error) throw error;

            var posData = _.filter(data[unId], function (el) {
                return el.value > 0
            })

            var negData = _.filter(data[unId], function (el) {
                return el.value < 0
            })

            var curData = id === 'left' ? posData : negData

            var root = d3.hierarchy({children: curData})
                .sum(function (d) {
                    return Math.max(0.3, Math.abs(d.value));
                })
                .sort(function (a, b) {
                    return b.value - a.value;
                });

            pack(root);

            var node = svg.select("g")
                .selectAll("g")
                .data(root.children)
                .enter().append("g")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .attr("class", "node");

            node.append("circle")
                .attr("id", function (d) {
                    return "node-" + d.data.tag;
                })
                .attr("r", function (d) {
                    return d.r;
                })
                .attr("fill", function (d) {
                    var a = (d.value + 1) / 2;
                    return d.data.value > 0 ? "rgba(37, 146, 56, " + a + ")" : "rgba(255, 78, 64, " + a + ")";
                })

            node.append("clipPath")
                .attr("id", function (d) {
                    return "clip-" + d.data.tag;
                })
                .append("use")
                .attr("xlink:href", function (d) {
                    return "#node-" + d.data.tag + "";
                });

            node.append("text")
                .attr("clip-path", function (d) {
                    return "url(#clip-" + d.data.tag + ")";
                })
                .selectAll("p")
                .data(function (d) {
                    return d.data.tag.split(".").pop().split(/(?=[A-Z][^A-Z])/g);
                })
                .enter().append("tspan")
                .attr("x", 0)
                .attr("y", function (d, i, nodes) {
                    return 13 + (i - nodes.length / 2 - 0.5) * 10;
                })
                .text(function (d) {
                    return d;
                });

            node.append("title")
                .text(function (d) {
                    return d.data.tag + "\n" + format(Math.abs(d.value));
                });

        });
    })
}