/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/13/17.
 */
import React from 'react';
import { Loader, Statistic, Icon, List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { statisticsFetch } from '../../actions/statistics';

const mapStateToProps = state => {
    return {
        statistics: state.statisticsReducer.statistics,
        fetching: state.statisticsReducer.fetching
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStatistics: () => dispatch(statisticsFetch()),
    }
};

class StatisticsWall extends React.Component {
    componentDidMount() {
        this.props.fetchStatistics();
    }

    render() {
        return (
            <div className="zssn-statistics-wall">
                {this.props.fetching ? (
                    <Loader active inline="centered"/>
                ) : (
                    <List horizontal>
                        <List.Item>
                            <Statistic>
                                <Statistic.Value>{this.props.statistics.infected.toFixed(2)}%</Statistic.Value>
                                <Statistic.Label>Infected</Statistic.Label>
                            </Statistic>
                        </List.Item>
                        <List.Item>
                            <Statistic>
                                <Statistic.Value>
                                    <Icon name="bitcoin"/>
                                    {this.props.statistics.lost.toFixed(2)}
                                </Statistic.Value>
                                <Statistic.Label>Money lost</Statistic.Label>
                            </Statistic>
                        </List.Item>
                    </List>
                )}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatisticsWall));